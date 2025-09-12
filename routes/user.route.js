const express = require('express');
const { addUser } = require('../controllers/user.controllers');
const userRouter = express.Router();

userRouter.post('/add-user', addUser);

module.exports = userRouter;