const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req, res) {
    const regex = /^c*/; 
    
    const q = url.parse(req.url, true);

    if (q.pathname === "/") { // Check if root page is requested
        filePath = 'index.html'; // Set the path to the index.html file
        fs.readFile(filePath, function (err, data) {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.write('<p>Erro: Página não encontrada</p>');
                res.end();
            } else {
                console.log('File contents:', data.toString());
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(data);
                res.end();
            }
        });
    } else if (regex.test(q.pathname)) {
        filePath = 'cidades' + q.pathname 
        if (!filePath.endsWith('.html') && !filePath.endsWith('.css')) {
            filePath += '.html';
        }
        
        fs.readFile(filePath, function (err, data) {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.write('<p>Erro: Página não encontrada</p>');
                res.end();
            } else {
                console.log('File contents:', data.toString());
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(data);
                res.end();
            }
        });
    } else if (q.pathname == "/w3.css") {
        fs.readFile('w3.css', function(err, data) {
            if (err) {
                console.error('Error reading CSS file:', err);
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.write('<p>Erro: Página não encontrada</p>');
                res.end();
            } else {
                console.log('CSS file contents:', data.toString());
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(data);
                res.end();
            }
        });
    } else {
        res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<p>Erro: Página não encontrada</p>');
        res.end();
    }
}).listen(7778);
