let express = require('express'),
	router = express.Router(),
	taskService = require('../services/taskService'),
	TaskNotFoundError = require('../services/taskNotFoundError');

router.get('/', function(req, res){
	taskService
		.getAll()
		.then(taskList => res.json(taskList))
		.catch(err => res.status(500).end());
});

router.get('/:id', function(req, res){
	taskService
		.get(parseInt(req.params.id))
		.then(task => res.json(task))
		.catch(err => {
			if (err instanceof TaskNotFoundError){
				res.status(404).end();	
			} else if (err) {
				res.status(500).end();
			}
		});
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