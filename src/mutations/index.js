/* eslint-disable global-require */

const mutations = {
  User: require('./User'),
};

module.exports = (builder) => {
  Object.keys(mutations).forEach((name) => {
    builder.extendWithMutations(mutations[name]);
  });
};
