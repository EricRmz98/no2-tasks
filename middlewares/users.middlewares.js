const { User } = require('../models/user.model');

//check if a user exist and is active
const userExists = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ where: { id, status: 'active' } });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'user not found',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
};

//check if a email exist on data base
const emailExists = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(409).json({
                status: 'error',
                message: 'email is already registered',
            });
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { userExists, emailExists };
