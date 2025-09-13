const path = require('path');

const loginPage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'login.html'));
}

const registerPage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'register.html'));
}

const mainPage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
}

module.exports = {
    loginPage,
    registerPage,
    mainPage
}
