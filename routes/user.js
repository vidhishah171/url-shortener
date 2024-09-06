const express = require('express');
const { userSignUp, userLogin } = require('../controllers/user');

const authRouter = express.Router();

authRouter.post('/', userSignUp)
authRouter.post('/login', userLogin)


module.exports = authRouter;