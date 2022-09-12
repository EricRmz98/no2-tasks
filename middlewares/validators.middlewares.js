const { body, validationResult } = require('express-validator');

//send an error response if validations failed
const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMsgs = errors.array().map((err) => err.msg);

        //error response 400 'bad request'
        return res.status(400).json({
            status: 'error',
            message: { errors: errorMsgs },
        });
    }

    next();
};

const createUserValidators = [
    body('name')
        .exists() //check if field exist on request
        .withMessage('name field missing in request')
        .isString()
        .withMessage('name must be a string')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('email')
        .exists()
        .withMessage('email field missing in request')
        .notEmpty()
        .withMessage('email cannot be empty')
        .isString()
        .withMessage('email must be a string')
        .isEmail()
        .withMessage('invalid email'),
    body('password')
        .exists()
        .withMessage('password field missing in request')
        .isString()
        .withMessage('password must be a string')
        .notEmpty()
        .withMessage('password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters'),
    checkValidations,
];

const updateUserValidators = [
    body('name')
        .exists()
        .withMessage('name field missing in request')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isString()
        .withMessage('name must be a string')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('email')
        .exists()
        .withMessage('email field missing in request')
        .notEmpty()
        .withMessage('email cannot be empty')
        .isString()
        .withMessage('email must be a string')
        .isEmail()
        .withMessage('invalid email'),
    checkValidations,
];

const createTaskValidators = [
    body('userId')
        .exists()
        .withMessage('userId field missing in request')
        .notEmpty()
        .withMessage('userId cannot be empty')
        .isInt()
        .withMessage('userId must be an integer'),
    body('title')
        .exists()
        .withMessage('title field missing in request')
        .notEmpty()
        .withMessage('title cannot be empty')
        .isString()
        .withMessage('title must be a string')
        .isLength({ min: 5 })
        .withMessage('title length must be at least 3 characters'),
    body('startDate')
        .exists()
        .withMessage('startDate field missing in request')
        .notEmpty()
        .withMessage('startDate cannot be empty')
        .isString()
        .withMessage('startDate must be a string')
        .isISO8601()
        .withMessage('startDate must be a date in format YYYY-MM-DD HH:mm:ss'),
    body('limitDate')
        .exists()
        .withMessage('limitDate field missing in request')
        .notEmpty()
        .withMessage('limitDate cannot be empty')
        .isString()
        .withMessage('limitDate must be a string')
        .isISO8601()
        .withMessage('limitDate must be a date in format YYYY-MM-DD HH:mm:ss'),
    checkValidations,
];

const finishDateValidators = [
    body('finishDate')
        .exists()
        .withMessage('finishDate field missing in request')
        .notEmpty()
        .withMessage('finishDate cannot be empty')
        .isString()
        .withMessage('finishDate must be a string')
        .isISO8601()
        .withMessage('finishDate must be a date in format YYYY-MM-DD HH:mm:ss'),
    checkValidations,
];

module.exports = {
    createUserValidators,
    updateUserValidators,
    createTaskValidators,
    finishDateValidators,
};
