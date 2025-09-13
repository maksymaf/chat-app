const express = require('express');
const { loginPage, registerPage, mainPage } = require('../controllers/page.controllers');
const { isAuth } = require('../middleware/isAuth');
const pageRouter = express.Router();

pageRouter.get('/', isAuth, mainPage);
pageRouter.get('/login', loginPage);
pageRouter.get('/register', registerPage);

module.exports = pageRouter;
