const conn = require('./db');
const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })
    
    conn.connect((err) => {
        if (err) throw err;

        var q = url.parse(req.url, true);
        
        var qdata = q.query;
        console.log(qdata)
        if (qdata.q == 'insertBlock')
            var sql = insertBlock()

        if (qdata.q == 'readBlocks')
            var sql = readBlocks()

        if (qdata.q == 'updateBlock')
            var sql = updateBlock()
            
        if (qdata.q == 'deleteBlock') 
            var sql = deleteBlock()

        conn.query(sql ,(err, result, fields) => {
                if (err) throw err;
                res.end(JSON.stringify(result));
            })
        });
}).listen(4000);

function insertBlock() {
    return ''
}

function readBlocks() {
    return `
    SELECT *
      FROM blocks;
`   
}

function updateBlock() {
    return ''
}

function deleteBlock() {
    return ''
}