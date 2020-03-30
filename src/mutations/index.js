/* eslint-disable global-require */
const mutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  description: 'Domain API actions',

  fields: () => ({
    ...require('./User'),
  }),
});

const createMutations = (builder) => {
  builder.extendWithMutations(mutationType);
};

module.exports = createMutations;
