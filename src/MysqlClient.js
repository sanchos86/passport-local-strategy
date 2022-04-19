import mysql from 'mysql2';
import 'dotenv/config';

export class MysqlClient {
  constructor() {
    this.mysqlClient = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
  }

  get dbClient() {
    return this.mysqlClient;
  }

  connect() {
    try {
      this.mysqlClient.connect();
      console.log('Connected to mysql');
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }
}
