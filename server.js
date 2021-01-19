var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    if (request.url === '/302') {
        response.writeHead(302, {
            'Location': 'http://localhost:3000/',
            'Link': '<https://lh3.googleusercontent.com>; rel="preconnect"',
        });
        response.end();
        return;
    }
    fs.readFile('./index.html', function(error, content) {
        if (error) {
            console.log('error:', error.message);
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html',
                // 'Link': '<https://lh3.googleusercontent.com>; rel="preconnect"'
            });
            response.end(content, 'utf-8');
        }
    });

}).listen(3000);