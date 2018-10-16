require('dotenv').config();

const { SERVER_HTTP_HOST, APOLLO_ENGINE_KEY, APOLLO_JWT_KEY } = process.env;

if (!APOLLO_JWT_KEY) {
  console.warn('Error: Please set APOLLO_JWT_KEY');
  throw {};
}

module.exports = {
  schemas: {
    primaryBackend: {
      endpoint: {
        url: `${SERVER_HTTP_HOST}/graphql`,
        headers: {
          Authorization: `Bearer ${APOLLO_JWT_KEY}`,
        },
      },
      engineKey: APOLLO_ENGINE_KEY,
    },
  },
};
