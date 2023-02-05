const mysql = require('mysql');

class MySqlDriver {
  constructor(host, database, user, password, port = 3306, connectionLimit = 4) {
    this.host = host;
    this.database = database;
    this.user = user;
    this.password = password;
    this.port = port;
    this.connectionLimit = connectionLimit;
  }

  createConnectionPool() {
    const connectionPool = mysql.createPool({
      connectionLimit: this.connectionLimit,
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      database: this.database,
      timezone: '-05:00',
    });
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      connection.release();
    });
    return connectionPool;
  }

  async execute(query, values = {}) {
    const connection = this.createConnectionPool();
    return new Promise((resolve, reject) => {
      connection.query({ sql: query, values, timeout: 15 * 1000 }, (error, data) => resolve(data));
    });
  }
}

module.exports = MySqlDriver;
