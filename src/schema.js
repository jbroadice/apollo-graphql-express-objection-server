const { Model } = require('objection');
const objectionGraphql = require('objection-graphql');
const knex = require('./knex');
const models = require('./models');

Model.knex(knex);

const builder = objectionGraphql
  .builder()
  .allModels(Object.values(models));

require('./mutations')(builder);

module.exports = builder.build();
