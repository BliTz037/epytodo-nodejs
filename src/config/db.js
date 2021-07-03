const mysql = require('mysql2');
require('dotenv').config();

const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

let connection = mysql.createConnection(config);
connection.connect(function(err) {
    if (err)
        console.log(`error connecting: ${err.stack}`);
    else
        console.log("Connection successfully to DB");
});

module.exports = {
    connection: mysql.createConnection(config)
}