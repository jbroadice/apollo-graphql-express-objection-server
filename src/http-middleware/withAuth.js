const { ForbiddenError } = require('apollo-server-express');
const getUserFromRequest = require('../utils/getUserFromRequest');

const withAuth = server => (
  async (req, res, next) => {
    const user = await getUserFromRequest(req);

    server.context = () => {
      if (!user) {
        throw new ForbiddenError('Invalid credentials');
      }
      return { user };
    };

    res.locals.user = user;

    server.requestOptions.rootValue = {
      async onQuery(qb) {
        await qb.mergeContext({
          isApiQuery: true,
          user,
        });
      },
    };

    next();
  }
);

module.exports = withAuth;
