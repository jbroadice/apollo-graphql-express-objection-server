const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { json } = require('body-parser');
const removeXPoweredBy = require('./http-middleware/removeXPoweredBy');
const withAuth = require('./http-middleware/withAuth');
const schema = require('./schema');
const getTokenFromLogin = require('./utils/getTokenFromLogin');

const server = new ApolloServer({
  schema,
  cors: false,
  bodyParserConfig: false,
});

const app = express();

app.use(removeXPoweredBy());

app.use(cors());

app.use(json());

app.use('/signin', async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const token = await getTokenFromLogin(req.body);

  if (!token) {
    res.status(401);
  }

  res.send({ token });
});

app.use(server.graphqlPath, withAuth(server));

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
