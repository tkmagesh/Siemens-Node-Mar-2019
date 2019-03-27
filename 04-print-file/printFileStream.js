var fs = require('fs');

var stream = fs.createReadStream('./test.txt', { encoding : 'utf8'});

stream.on('data', function(chunk){
	console.log(chunk);
});

stream.on('end', function(){
	console.log('Thats all folks');
});

stream.on('end', function(){
	console.log('--------------------------------------------');
});

stream.on('error', function(){
	console.log('Something went wrong!');
});