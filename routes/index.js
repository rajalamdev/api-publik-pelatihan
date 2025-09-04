const taskRouter = require('./task');
const authRouter = require('./auth');
const express = require('express');
const router = express.Router();

router.use('/tasks', taskRouter);
router.use('/auth', authRouter);

module.exports = router


