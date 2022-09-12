const express = require('express');

//controllers
const {
    createTask,
    getAllTasks,
    cancelTask,
    updateTaskStatus,
    getTasksByStatus,
} = require('../controllers/tasks.controllers');

//middlewares
const {
    taskUserExist,
    taskExist,
    taskIsActive,
    compareStartLimitDates,
    compareStartFinishDates,
    validateTaskStatusParam,
} = require('../middlewares/tasks.middlewares');
const {
    createTaskValidators,
    finishDateValidators,
} = require('../middlewares/validators.middlewares');

const tasksRouter = express.Router();

//create task
tasksRouter.post(
    '/',
    createTaskValidators,
    compareStartLimitDates,
    taskUserExist,
    createTask
);

//get all tasks
tasksRouter.get('/', getAllTasks);

//get tasks by status
tasksRouter.get('/:status', validateTaskStatusParam, getTasksByStatus);

//update task finishDate
tasksRouter.patch(
    '/:id',
    finishDateValidators,
    taskExist,
    taskIsActive,
    compareStartFinishDates,
    updateTaskStatus
);

//soft delete task
tasksRouter.delete('/:id', taskExist, taskIsActive, cancelTask);

module.exports = { tasksRouter };
