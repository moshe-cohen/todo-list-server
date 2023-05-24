const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

router.get('/', tasksController.getAllTasks);
router.get('/page/:page', tasksController.getTasksInPages);
router.post('/', tasksController.createTask);
router.get('/:id', tasksController.getTaskById);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
