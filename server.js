var http = require('http');
var fs = require('fs');
var port = 1337;
function serveStaticFile(res, path, contentType, responseCode) {
   if (!responseCode) {
       responseCode = 200;
   }
fs.readFile(__dirname + path, function (err, data) {
       if (err) {
           res.writeHead(500, {'Content-Type': 'text/plain'});
           res.end('500 - Internal Error');
       } else {
           res.writeHead(responseCode, {'Content-Type': contentType});
           res.end(data);
       }




   });
}
http.createServer(function (req, res) {
   var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
   switch (path) {
       case '':
           serveStaticFile(res, '/public/index.html', 'text/html');
           break;
       case '/css/style.css':
           serveStaticFile(res, '/public/css/style.css', 'text/css');
           break;
       case '/images/computer-typing.jpeg':
           serveStaticFile(res, '/public/images/computer-typing.jpeg', 'imag/jpeg');
           break;
           //Serve each image inside the images folder to show appropriate images on the page.
       case '/images/blogging.png':
           serveStaticFile(res, '/public/images/blogging.png', 'imag/png');
           break;
       case '/images/logo.png':
           serveStaticFile(res, '/public/images/logo.png', 'imag/png');
           break;
default:
           serveStaticFile(res, '/public/404.html', 'text/html', 404);
           break;
   }


}).listen(port);


console.log("Server started on http://localhost:" + port);


