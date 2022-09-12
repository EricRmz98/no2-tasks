const express = require('express');

//controllers
const {
    getActiveUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/users.controllers');

//middlewares
const { userExists, emailExists } = require('../middlewares/users.middlewares');
const {
    createUserValidators,
    updateUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

//create user
usersRouter.post('/', createUserValidators, emailExists, createUser);

//get active users
usersRouter.get('/', getActiveUsers);

//update user name and email
usersRouter.patch(
    '/:id',
    updateUserValidators,
    emailExists,
    userExists,
    updateUser
);

//soft delete user
usersRouter.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter };
