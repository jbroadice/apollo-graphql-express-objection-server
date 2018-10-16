require('dotenv').config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;

const defaults = {
  client: 'mysql',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
};

module.exports = {

  development: {
    ...defaults,
    debug: true,
    useNullAsDefault: true,
  },

  production: {
    ...defaults,
    debug: false,
    useNullAsDefault: true,
  },

};
