module.exports = function(req, res, next){
	var logMessage = req.method + '\t' + req.urlObj.pathname;
	var start = new Date();
	res.on('finish', function(){
		var end = new Date(),
			delta = end - start;
		logMessage += '\t' + res.statusCode + '\t' + delta + 'ms';
		console.log(logMessage);
	})
	next();
}