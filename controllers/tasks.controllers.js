//models
const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

//create a new task
const createTask = async (req, res) => {
    try {
        const { userId, title, startDate, limitDate } = req.body;

        const newTask = await Task.create({
            userId,
            title,
            startDate,
            limitDate,
        });

        //201 'success an a resource has been created'
        res.status(201).json({
            status: 'success',
            data: { newTask },
        });
    } catch (error) {
        console.log(error);
    }
};

//send a response with all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ include: { model: User } });

        res.status(200).json({
            status: 'success',
            data: { tasks },
        });
    } catch (error) {
        console.log(error);
    }
};

//update task status to canceled
const cancelTask = async (req, res) => {
    try {
        const { task } = req;

        await task.update({ status: 'canceled' });

        res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        console.log(error);
    }
};

//update task status to completed or late depending id it was delivered on time
const updateTaskStatus = async (req, res) => {
    try {
        const task = req.task;

        const limitDate = new Date(req.task.limitDate);
        const finishDate = new Date(req.body.finishDate);

        let status = '';

        if (finishDate < limitDate) {
            status = 'completed';
        } else {
            status = 'late';
        }

        await task.update({ status, finishDate });

        res.status(200).json({
            status: 'success',
            data: { task },
        });
    } catch (error) {
        console.log(error);
    }
};

//send a response with all tasks that has the provided status
const getTasksByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        const tasks = await Task.findAll({
            where: { status },
            include: { model: User },
        });

        res.status(200).json({
            status: 'success',
            data: { tasks },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createTask,
    getAllTasks,
    cancelTask,
    updateTaskStatus,
    getTasksByStatus,
};
