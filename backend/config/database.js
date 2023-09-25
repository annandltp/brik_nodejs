const { knex } = require('knex');

module.exports = knex({
  client: 'mysql2',
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 600, // default mysql `wait_timeout` is 10 minutes
  },
  connection: {
    host: 'localhost',
    port: 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.DATABASE_NAME || 'stock_management',
  },
});