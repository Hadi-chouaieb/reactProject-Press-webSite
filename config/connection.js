const mysql = require("mysql")
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jornalisme'
    });

module.exports = connection;