const { Model } = require('objection');
const { User, Project } = require('../src/models');

exports.seed = async (knex) => {
  Model.knex(knex);
  await User.query().delete();
  await Project.query().delete();
  await User.query().insertGraph([
    {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@email.com',
      password: 'alice',
      projects: [{ id: 1, title: 'Project by Alice' }],
    },
    {
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob@email.com',
      password: 'bob',
      projects: [{ id: 2, title: 'Project by Bob' }],
    },
    {
      firstName: 'Eve',
      lastName: 'Smith',
      email: 'eve@email.com',
      password: 'eve',
      projects: [{ id: 3, title: 'Project by Eve' }],
    },
  ]);
};
