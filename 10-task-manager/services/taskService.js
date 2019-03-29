const taskDb = require('./taskDb');
var TaskNotFoundError = require('./taskNotFoundError');


let taskService = {
	async getAll(){
		return taskDb.getData();
	},

	async get(taskId){
		
		let taskList = await taskDb.getData();
		let resultTask = taskList.find(task => task.id === taskId);
		if (!resultTask){
			throw new TaskNotFoundError('Task not found!');
		} else {
			return resultTask;
		}
	
	},

	addNew(newTaskData){
		let newTask = {...newTaskData, id : taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1};
		taskList.push(newTask);
		return newTask;
	},
	update(taskIdToUpdate, taskData){
		var existingTask = taskList.find(task => task.id === taskIdToUpdate);
		if (!existingTask)
			throw new Error('Task not found');
		taskList = taskList.map( task => task.id === taskIdToUpdate ? taskData : task);
		return taskData;
	},
	delete(taskIdToDelete){
		taskList = taskList.filter(task => task.id !== taskIdToDelete);
	}
}

module.exports = taskService;