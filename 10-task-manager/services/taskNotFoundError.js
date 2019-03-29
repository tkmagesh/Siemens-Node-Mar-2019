class TaskNotFoundError extends Error{
	constructor(message){
		super();
		this.message = message;
	}
}

module.exports = TaskNotFoundError;