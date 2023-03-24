const http = require('http');
const fs = require('fs');
const path = require('path');
const connection = require('./db');
const api = require('./api.js')
// iniciar uma conexão http

const server = http.createServer((req, res) => {

    if(req.url == '/') {
        fs.readFile('public/index.html', (err, data) => {
            if (err) throw err;
            else res.end(data)
        })
    } else {
        filePath = path.join(__dirname, 'public', req.url)
        fs.readFile(filePath, (err, data) => { 
            if (err) throw err
            else res.end(data)
        })
    }

    }).listen(3001); 

