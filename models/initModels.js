//models
const { Task } = require('./task.model');
const { User } = require('./user.model');

//create models relations
const initModels = () => {
    //1 user <----> Many tasks
    User.hasMany(Task, { foreignKey: 'userId' });
    Task.belongsTo(User);
};

module.exports = { initModels };
