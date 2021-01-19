const scene = process.env.SCENE || 'nolink';
var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    if (request.url === '/302') {
        response.writeHead(302, {
            'Location': 'http://localhost:3000/',
            'Link': '<https://pbs.twimg.com>; rel="preconnect"',
        });
        response.end();
        return;
    }
    fs.readFile('./index.html', function(error, content) {
        if (error) {
            console.log('error:', error.message);
        } else {
            let headers = {
                'Content-Type': 'text/html'
            };
            if (scene !== 'nolink') {
                headers['Link'] = '<https://pbs.twimg.com>; rel="preconnect"';
            }
            response.writeHead(200, headers);
            response.end(content, 'utf-8');
        }
    });

}).listen(3000);