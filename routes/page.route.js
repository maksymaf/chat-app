const express = require('express');
const { loginPage, registerPage } = require('../controllers/page.controllers');
const pageRouter = express.Router();

pageRouter.get('/login', loginPage);
pageRouter.get('/register', registerPage);

module.exports = pageRouter;
