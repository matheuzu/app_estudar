const http = require('http');
const fs = require('fs');

// iniciar uma conexão http

const server = http.createServer(function (req, res) {
    if(req.url == '/') {
        fs.readFile('../index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            }
            else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }});
    } else if (req.url === '/style.css') {
        fs.readFile('../styles/style.css', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css'});
                res.end(data);
            }});
    } else {
        res.writeHead(404);
        res.end('Page not found');
    }}).listen(3001); 

