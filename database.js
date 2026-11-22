const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123', // 👈 Ithe TUJHA MySQL password tak
  database: 'store_rating_app'
});
db.connect(e => console.log(e ? 'DB Error: '+e.message : 'MySQL Connected ✅'));
module.exports = db;