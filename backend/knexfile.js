// Update with your config settings.

const connection = {
  host: 'localhost',
  port: 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASS || '',
  database: process.env.DATABASE_NAME || 'stock_management',
};

const client = 'mysql2';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client,
    connection,
    pool: {
      min: 0,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations'
    },
  },

  staging: {
    client,
    connection,
    pool: {
      min: 0,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations'
    },
  },

  production: {
    client,
    connection,
    pool: {
      min: 0,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations'
    },
  }

};
