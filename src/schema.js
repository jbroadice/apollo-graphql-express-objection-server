const { Model } = require('objection');
const objectionGraphql = require('objection-graphql');
const models = require('./models');
const createMutations = require('./mutations');

const createSchema = (db) => {
  Model.knex(db);

  const builder = objectionGraphql
    .builder()
    .allModels(Object.values(models));

  createMutations(builder);

  return builder.build();
};

module.exports = createSchema;
