const path = require('path');

const loginPage = (req, res) => {
    console.log('loginpage');
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'login.html'));
}

const registerPage = (req, res) => {
    console.log('registerpage')
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'register.html'));
}

module.exports = {
    loginPage,
    registerPage
}