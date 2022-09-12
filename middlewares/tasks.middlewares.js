//models
const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

//check if user exist an is active before create a task
const taskUserExist = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const user = await User.findOne({
            where: { id: userId, status: 'active' },
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'user not found',
            });
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

//check if task exist
const taskExist = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ where: { id } });

        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: 'task not found',
            });
        }

        req.task = task;
        next();
    } catch (error) {
        console.log(error);
    }
};

//check if task status is active
const taskIsActive = (req, res, next) => {
    const { task } = req;

    if (task.status !== 'active') {
        return res.status(409).json({
            status: 'error',
            message: 'task has already ended',
        });
    }

    next();
};

//compare if limitDate is greater than startDate
const compareStartLimitDates = (req, res, next) => {
    const startDate = new Date(req.body.startDate);
    const limitDate = new Date(req.body.limitDate);

    if (startDate >= limitDate) {
        return res.status(400).json({
            status: 'error',
            message: 'limitDate must be greater than startDate',
        });
    }

    next();
};

//compare if finishDate is greater than startDate
const compareStartFinishDates = (req, res, next) => {
    const startDate = new Date(req.task.startDate);
    const finishDate = new Date(req.body.finishDate);

    if (startDate > finishDate) {
        return res.status(409).json({
            status: 'error',
            message: 'finishDate cannot be minor than startDate',
        });
    }

    next();
};

//check if endpoint param is a valid task status
const validateTaskStatusParam = (req, res, next) => {
    const { status } = req.params;

    if (
        !(
            status === 'active' ||
            status === 'canceled' ||
            status === 'completed' ||
            status === 'late'
        )
    ) {
        return res.status(409).json({
            status: 'error',
            message: 'endpoint param not exist',
        });
    }

    next();
};

module.exports = {
    taskUserExist,
    taskExist,
    taskIsActive,
    compareStartLimitDates,
    compareStartFinishDates,
    validateTaskStatusParam,
};
