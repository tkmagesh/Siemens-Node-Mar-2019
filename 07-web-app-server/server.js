var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring');
	calculator = require('./calculator');


var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.json', '.xml', '.txt'];
function isStatic(resourceName){
	var resExtn = path.extname(resourceName);
	return staticExtns.indexOf(resExtn) >= 0;
}

var server = http.createServer(function( req , res){
	var resource = req.url === '/' ? 'index.html' : req.url;
	var urlObj = url.parse(resource);
	console.log(req.method + '\t' + req.url);
	
	if (isStatic(urlObj.pathname)){
		var resourcePath = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourcePath);
		stream.pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === "GET"){
		var data = querystring.parse(urlObj.query),
			op = data.op,
			x = parseInt(data.x),
			y = parseInt(data.y),
			result = calculator[op](x,y);

		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === "POST"){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var data = querystring.parse(rawData),
				op = data.op,
				x = parseInt(data.x),
				y = parseInt(data.y),
				result = calculator[op](x,y);

			res.write(result.toString());
			res.end();
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080!');
});