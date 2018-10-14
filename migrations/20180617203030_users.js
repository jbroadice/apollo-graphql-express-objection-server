
exports.up = async (knex) => {
  await knex.schema.createTable('User', (table) => {
    table.increments('id').primary();
    table.string('email');
    table.string('firstName');
    table.string('lastName');
    table.string('password');
    table.timestamp('createdAt').defaultTo(knex.fn.now(6));
  });
  await knex.schema.createTable('Project', (table) => {
    table.increments('id').primary();
    table.integer('ownerId');
    table.string('title');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('User');
  await knex.schema.dropTable('Project');
};
