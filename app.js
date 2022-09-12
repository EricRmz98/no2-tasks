const express = require('express');

//routers
const { tasksRouter } = require('./routes/tasks.routes');
const { usersRouter } = require('./routes/users.routes');

//init express app
const app = express();

//enable express app to receive JSON data
app.use(express.json());

//define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

//catch non existing endpoints
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exist`,
    });
});

module.exports = { app };
