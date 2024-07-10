const mysql = require ("mysql2/promise");

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: 'admin',
    database: 'bd_api',
});

module.exports = connection;