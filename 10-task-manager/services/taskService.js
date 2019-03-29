let taskList = [
	{id : 1, name : 'Explore JavaScript', isCompleted : false},
	{id : 2, name : 'Master Node.js', isCompleted : true},
	{id : 3, name : 'Cast the vote', isCompleted : false},
];

let taskService = {
	getAll(){
		return [...taskList];
	},

	get(taskId){
		let resultTask = taskList.find(task => task.id == taskId);
		if (!resultTask){
			throw new Error('Task not found');
		}
		return resultTask;
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