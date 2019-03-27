var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');

var server = http.createServer(function( req /* ReadStream */, res /* WriteStream */){
	var resource = req.url === '/' ? 'index.html' : req.url;
	var urlObj = url.parse(resource);
	console.log(resource);
	var resourcePath = path.join(__dirname, urlObj.pathname);
	if (!fs.existsSync(resourcePath)){
		res.statusCode = 404;
		res.end();
		return;
	}
	var stream = fs.createReadStream(resourcePath);
	/*stream.on('data', function(chunk){
		res.write(chunk);
	});
	stream.on('end', function(){
		res.end();
	});*/
	stream.pipe(res);
});

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080!');
});