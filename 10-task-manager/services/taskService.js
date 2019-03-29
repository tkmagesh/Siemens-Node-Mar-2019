const taskDb = require('./taskDb');
var TaskNotFoundError = require('./taskNotFoundError');


let taskService = {
	getAll(){
		return taskDb.getData();
	},

	get(taskId){
		return taskDb
			.getData()
			.then(taskList => {
				let resultTask = taskList.find(task => task.id == taskId);
				if (!resultTask){
					throw new TaskNotFoundError('Task not found!');
				}
				return resultTask;
			});
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