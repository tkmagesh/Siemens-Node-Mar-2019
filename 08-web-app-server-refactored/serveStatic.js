var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.json', '.xml', '.txt'];
function isStatic(resourceName){
	var resExtn = path.extname(resourceName);
	return staticExtns.indexOf(resExtn) >= 0;
}

module.exports = function(req, res){
	var resource = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
	if (isStatic(resource)){
		var resourcePath = path.join(__dirname, resource);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourcePath);
		stream.pipe(res);
	}
}