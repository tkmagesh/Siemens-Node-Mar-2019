var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.json', '.xml', '.txt'];
function isStatic(resourceName){
	var resExtn = path.extname(resourceName);
	return staticExtns.indexOf(resExtn) >= 0;
}

module.exports = function(staticResourcePath){
	return function(req, res, next){
		var resource = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
		var resourcePath = path.join(staticResourcePath, resource);
		if (isStatic(resource) && fs.existsSync(resourcePath)){
			var stream = fs.createReadStream(resourcePath);
			stream.pipe(res);
			stream.on('end', function(){
				res.end();
				next();
			})
		} else {
			next();
		}
	}
}