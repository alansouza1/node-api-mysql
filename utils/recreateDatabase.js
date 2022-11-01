const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const connect = () => mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
});

const runSql = (file) => async () => {
  const db = connect();
  const sql = fs.readFileSync(file, 'utf8');
  await db.query(sql);
  await db.end();
};

const recreateDatabase = runSql('/home/node/app/StoreManager.sql');

if (require.main === module) {
  recreateDatabase().then(() => {
    console.log('Banco restaurado com sucesso');
    process.exit(0);
  });
}
