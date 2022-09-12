//models
const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

const getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await User.findAll({
            where: { status: 'active' },
            include: { model: Task },
        });

        res.status(200).json({
            status: 'success',
            data: { users: activeUsers },
        });
    } catch (error) {
        console.log(error);
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await User.create({ name, email, password });

        res.status(202).json({
            status: 'success',
            data: { newUser },
        });
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const { user } = req;

        await user.update({ name, email });

        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { user } = req;

        //soft delete
        await user.update({ status: 'deleted' });

        res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getActiveUsers, createUser, updateUser, deleteUser };
