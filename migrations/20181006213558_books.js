
exports.up = async (knex) => {
  await knex.schema.createTable('Book', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.string('author');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('Book');
};
