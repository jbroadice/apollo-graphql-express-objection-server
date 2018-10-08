const {
  GraphQLObjectType, GraphQLInputObjectType,
  GraphQLNonNull, GraphQLString, GraphQLInt,
} = require('graphql');

const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const getTokenFromLogin = require('../utils/getTokenFromLogin');

const userType = new GraphQLObjectType({
  name: 'userType',
  description: 'Use this object to create new user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'ID',
    },
    firstName: {
      type: GraphQLString,
      description: 'First name',
    },
    lastName: {
      type: GraphQLString,
      description: 'Last name',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email address',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Password',
    },
  }),
});

const authResponseType = new GraphQLObjectType({
  name: 'authResponseType',
  description: 'Represents an authentication response',
  fields: () => ({
    token: {
      type: GraphQLString,
      description: 'Auth token',
    },
  }),
});

const createUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserType',
  description: 'User',
  fields: () => ({
    firstName: {
      type: GraphQLString,
      description: 'First name',
    },
    lastName: {
      type: GraphQLString,
      description: 'Last name',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email address',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Password',
    },
  }),
});

const signinUserInputType = new GraphQLInputObjectType({
  name: 'SigninUserType',
  description: 'Signin',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email address',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Password',
    },
  }),
});

const mutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  description: 'Domain API actions',

  fields: () => ({

    createUser: {
      description: 'Creates a new user',
      type: userType,
      args: {
        input: { type: new GraphQLNonNull(createUserInputType) },
      },
      resolve: async (root, { input }) => {
        const hash = await bcrypt.hash(input.password, 8);
        const graph = await User.query().insertGraph({
          ...input,
          password: hash,
        });
        return graph.toJSON();
      },
    },

    signinUser: {
      description: 'Sign in a user',
      type: authResponseType,
      args: {
        input: { type: new GraphQLNonNull(signinUserInputType) },
      },
      resolve: async (root, { input }) => {
        const token = await getTokenFromLogin(input);
        if (!token) {
          throw new AuthenticationError('Invalid credentials.');
        }
        return { token };
      },
    },

  }),
});

module.exports = mutationType;
