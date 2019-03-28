var chalk = require('chalk');

module.exports = function(req, res, next){
	var logMessage = chalk.green(req.method) + '\t' + chalk.magenta(req.urlObj.pathname);
	var start = new Date();
	res.on('finish', function(){
		var end = new Date(),
			delta = end - start;
		logMessage += '\t' + chalk.red(res.statusCode) + '\t' + chalk.blue(delta) + 'ms';
		console.log(logMessage);
	})
	next();
}