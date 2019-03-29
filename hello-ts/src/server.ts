import * as http from 'http';

let server : http.Server = http.createServer(function(req, res){
	res.write('Hello there!');
	res.end();
});

server.listen(9090);

