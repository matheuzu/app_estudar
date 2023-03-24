const conn = require('./db');
const http = require('http');

http.createServer((req, res) => {
    
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    conn.connect((err) => {
        if (err) throw err;
        
        var sql = `
            SELECT *
            FROM blocks;
        `   
        conn.query(sql ,(err, result, fields) => {
                if (err) throw err;
                res.end(JSON.stringify(result));
            })
        });
}).listen(4000);

