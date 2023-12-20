// Create web server
// Run: node comments.js

var http = require('http'),
    fs = require('fs'),
    qs = require('querystring');

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

http.createServer(function(req, res) {
    var url = req.url.split('?');
    var params = qs.parse(url[1]);
    var path = url[0].toLowerCase();
    switch (path) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Home page');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About');
            break;
        case '/contact':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Contact');
            break;
        case '/form':
            serveStaticFile(res, '/public/form.html', 'text/html');
            break;
        case '/process':
            if (req.method == 'POST') {
                var body = '';
                req.on('data', function(data) {
                    body += data;
                });
                req.on('end', function() {
                    var post = qs.parse(body);
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify(post));
                });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Bad request');
            }
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            break;
    }
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate...');