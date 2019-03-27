function addSync(x,y){
	if (typeof x === 'undefined' || typeof y === 'undefined')
		throw new Error('Invalid argument(s)');
	return x + y;
}

function addSyncClient(x,y){
	try{
		var result = addSync(x,y);
		console.log(result);
	} catch(e){
		console.log('something went wront')
		console.log(e);
	}
}

module.exports.addSyncClient = addSyncClient;

function addAsync(x,y, callback){
	setTimeout(function(){
		if (typeof x === 'undefined' || typeof y === 'undefined')
			return callback(Error('Invalid argument(s)'));
		callback(null, x + y);
	}, 4000);
}

function addAsyncClient(x,y){
	
	addAsync(x,y, function(err, result){
		if (err){
			console.log('something went wront')
			return		
		}
		console.log(result);
	});

}

module.exports.addAsyncClient = addAsyncClient;