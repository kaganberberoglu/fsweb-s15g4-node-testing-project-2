/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const sharedConfig = {
  client: "sqlite3",
  migrations: {
    directory: "./data/migrations"
  },
  seeds: {
    directory: "./data/seeds"
  },
  useNullAsDefault: false,
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done)
    }
  }
};

module.exports = {

  development: {
    ...sharedConfig,
    connection: {
      filename: './todo.db3'
    }
  },
  testing: {
    ...sharedConfig,
    connection: {
      filename: './testing.db3'
    }
  }
};
