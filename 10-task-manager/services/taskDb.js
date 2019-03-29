const fs = require('fs');

const dbFile = require('path').join(__dirname, '../db/db.json');

let taskDb = {
	getData(callback){
		fs.readFile(dbFile, { encoding : 'utf8'}, function(err, fileContents){
			let data = JSON.parse(fileContents);
			callback(data);
		});
	}
}

module.exports = taskDb;