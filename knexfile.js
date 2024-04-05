// knexfile.js
require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.SUPABASE_HOST,
      user: process.env.SUPABASE_USER,
      password: process.env.SUPABASE_PASSWORD,
      database: "postgres",
    },
    pool: { min: 0, max: 7 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};