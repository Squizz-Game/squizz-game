module.exports = require('mysql2').createConnection({
  host: 'localhost',
  user: 'root',
  database: process.env.DB
})