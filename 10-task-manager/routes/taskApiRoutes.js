let express = require('express'),
	router = express.Router(),
	taskService = require('../services/taskService');

router.get('/', function(req, res){
	let taskList = taskService.getAll();
	res.json(taskList);
});

router.get('/:id', function(req, res){
	try{
		res.json(taskService.get(parseInt(req.params.id)));
	} catch (e){
		res.status(404).end();
	}
});

router.post('/', function(req, res){
	let newTaskData = req.body;
	let newTask = taskService.addNew(newTaskData);
	res.status(201).json(newTask);
});

router.put('/:id', function(req, res){
	try{
		let taskData = req.body,
			taskIdToUpdate = parseInt(req.params.id);
		let updatedTask = taskService.update(taskIdToUpdate, taskData);
		res.status(200).json(updatedTask);
	} catch (e){
		res.status(404).end();
	}
})

router.delete('/:id', function(req, res){
	try{
		let taskIdToDelete = parseInt(req.params.id);
		taskService.delete(taskIdToDelete);
		res.status(200).json({});
	} catch (e){
		res.status(404).end();
	}
	
});

module.exports = router;