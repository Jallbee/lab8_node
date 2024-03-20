var http = require('http');

var fs = require('fs')

var path = require('path')

var port = 1337

function serveStaticFile( res, path,contentType,ResponseCode)
{ let statusCode = 200 ;
let contentType = 'text/html';

var extname = path.extname(filePath);
switch (extname) {
case '.css':
	contentType = 'text/css';
	break;
case '.png':
	contentType = 'image/png';
	break;
}

fs.readFile(filePath, (err, data ) =>  {
	if (err){ 
		statusCode = 500;
		data = 'Internal Server Error'}
		response.writeHead(statusCode,{'Content-Type': contentType});
		response.end(data);
});

var server= http.createServer ((request, response) => {
	let url = request.url.toLowerCase();
	url = url.split('?')[0];
	if(url.endsWith('/')) { url= url.slice(0,-1);
}

let filePath = '/public' + url;

if (url === '/' || url === '/index' || url === '/index.html') {
        filePath = './public/index.html';
    } else if (url === '/about' || url === '/about.html') {
        filePath = './public/about.html';
    } else if (url.startsWith('/css/')) {
        filePath = './public' + url;
    } else if (url.startsWith('/images/')) {
        filePath = './public' + url;
    } else {
    	filePath = './public/404.html';
        response.statusCode = 404;
    }
    serveStaticFile(filePath, response);
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
