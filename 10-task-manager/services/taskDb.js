const fs = require('fs'),
	util = require('util'),
	bluebird = require('bluebird');

const dbFile = require('path').join(__dirname, '../db/db.json');

/*let taskDb = {
	getData(callback){
		fs.readFile(dbFile, { encoding : 'utf8'}, function(err, fileContents){
			if (err){
				return callback(err);
			}
			let data = JSON.parse(fileContents);
			callback(null, data);
		});
	},
	saveData(data, callback){
		fs.writeFile(dbFile, JSON.stringify(data), function(err){
			return callback(err);
		});
	}
}*/



/*let taskDb = {
	getData(){
		var promise = new Promise(function(resolveFn, rejectFn){
			fs.readFile(dbFile, { encoding : 'utf8'}, function(err, fileContents){
				if (err){
					return rejectFn(err);
				}
				let data = JSON.parse(fileContents);
				resolveFn(data);
			});	
		})
		return promise;
	},
	saveData(data){
		var promise = new Promise(function(resolveFn, reject){
			fs.writeFile(dbFile, JSON.stringify(data), function(err){
				if (err) {
					rejectFn(err)
				} else {
					resolveFn();
				}
			});	
		});
	}
}*/

/*let readFileAsync = util.promisify(fs.readFile),
	writeFileAsync = util.promisify(fs.writeFile)

let taskDb = {
	getData(){
		return readFileAsync(dbFile, { encoding : 'utf8'})
			.then(fileContents => JSON.parse(fileContents));
		
	},
	saveData(data){
		return writeFileAsync(dbFile, JSON.stringify(data));
	}
}*/

bluebird.promisifyAll(fs);



let taskDb = {
	getData(){
		return fs.readFileAsync(dbFile, { encoding : 'utf8'})
			.then(fileContents => JSON.parse(fileContents));
		
	},
	saveData(data){
		return fs.writeFileAsync(dbFile, JSON.stringify(data));
	}
}

module.exports = taskDb;