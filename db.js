const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_estudar'
});

connection.connect((err) => {
    if (err) throw err;
    else console.log('Db connected')
})

module.exports = connection;