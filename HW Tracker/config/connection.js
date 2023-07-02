const mysql = require('mysql2');

// Connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'nba_db',
});

// Connect to the database
connection.connect((error) => {
  if (error) throw error;
  console.log('Connected!');
});

module.exports = connection;
