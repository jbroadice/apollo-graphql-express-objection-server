const { Model } = require('objection');
const { Book } = require('../src/models');

exports.seed = async (knex) => {
  Model.knex(knex);
  await Book.query().delete();
  await Book.query().insertGraph([
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ]);
};
