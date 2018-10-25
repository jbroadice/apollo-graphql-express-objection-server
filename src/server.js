const db = require('./db');
const app = require('./app')({ db });

const port = process.env.PORT || 4000;
const host = process.env.HOSTNAME || '0.0.0.0';

// Launch Node.js server
const server = app.listen({ port, host }, () => {
  console.log(`🚀 Server ready at http://${host}:${port}/`);
});

// Shutdown Node.js app gracefully
function handleExit(options, err) {
  if (options.cleanup) {
    const actions = [server.close, db.destroy];
    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) process.exit();
        });
      } catch (err) {
        if (i === actions.length - 1) process.exit();
      }
    });
  }
  if (err) console.error(err);
  if (options.exit) process.exit();
}

process.on('exit', handleExit.bind(null, { cleanup: true }));
process.on('SIGINT', handleExit.bind(null, { exit: true }));
process.on('SIGTERM', handleExit.bind(null, { exit: true }));
process.on('uncaughtException', handleExit.bind(null, { exit: true }));
