const { app } = require('./app');

//utils
const { initModels } = require('./models/initModels');
const { db } = require('./utils/database.util');

const startServer = async () => {
    try {
        await db.authenticate();

        //establish models relations
        initModels();

        await db.sync();

        //set server to listen
        const PORT = 4000;

        app.listen(PORT, () => {
            console.log('express app running :)');
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
