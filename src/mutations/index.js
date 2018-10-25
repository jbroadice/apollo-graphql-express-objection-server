/* eslint-disable global-require */
const mutations = {
  User: require('./User'),
};

const createMutations = (builder) => {
  Object.keys(mutations).forEach((name) => {
    builder.extendWithMutations(mutations[name]);
  });
};

module.exports = createMutations;
