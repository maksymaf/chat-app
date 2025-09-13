const express = require('express');
const { addUser, loginUser } = require('../controllers/user.controllers');
const userRouter = express.Router();

userRouter.post('/add-user', addUser);
userRouter.post('/login', loginUser);

module.exports = userRouter;