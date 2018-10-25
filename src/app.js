const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { json } = require('body-parser');
const removeXPoweredBy = require('./http-middleware/removeXPoweredBy');
const withAuth = require('./http-middleware/withAuth');
const createSchema = require('./schema');
const authRoutes = require('./routes/auth');

const { NODE_ENV, APOLLO_ENGINE_KEY } = process.env;

const isDev = NODE_ENV !== 'production';

const createApp = ({ db }) => {
  const server = new ApolloServer({
    schema: createSchema(db),
    introspection: isDev,
    playground: isDev,
    cors: false,
    bodyParserConfig: false,
    engine: {
      apiKey: APOLLO_ENGINE_KEY,
    },
  });

  const app = express();

  app.use(removeXPoweredBy());

  app.use(cors());

  app.use(json());

  app.use(express.static(path.resolve(__dirname, '../static')));

  app.use(authRoutes);

  app.use(server.graphqlPath, withAuth(server));

  server.applyMiddleware({ app });

  return app;
};

module.exports = createApp;
