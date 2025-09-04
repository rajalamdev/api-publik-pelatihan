const taskController = require('../../controllers/taskController');
const express = require('express');
const router = express.Router();
const authenticate = require('../../lib/authenticate');

router.post('/', authenticate ,taskController.createTask);
router.get('/', authenticate ,taskController.getTask);
router.put('/:id', authenticate ,taskController.updateTask);
router.delete('/:id', authenticate ,taskController.deleteTask);

module.exports = router


