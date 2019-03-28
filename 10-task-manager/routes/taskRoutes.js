var express = require('express'),
	router = express.Router();

var taskList = [
	{id : 1, name : 'Explore JavaScript', isCompleted : false},
	{id : 2, name : 'Master Node.js', isCompleted : true},
	{id : 3, name : 'Cast the vote', isCompleted : false},
]


router.get('/', function(req, res){
	var viewModel = { list : taskList };
	res.render('tasks/index', viewModel);
});

router.get('/new', function(req, res){
	res.render('tasks/new');
});

router.post('/new', function(req, res){
	var newTaskName = req.body.newTaskName,
		newTaskId = taskList.reduce(function(result, task){
			return result > task.id ? result : task.id;
		}, 0) + 1
		newTask = {
			id : newTaskId,
			name : newTaskName,
			isCompleted : false
		};
	taskList.push(newTask);
	res.redirect('/tasks');

});

router.get('/api', function(req, res){
	res.json(taskList);
});

module.exports = router;