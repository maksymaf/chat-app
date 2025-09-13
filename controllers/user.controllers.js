const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

const addUser = async (req, res) => {
    const {username, email, password} = req.body;

    let candidate = await User.findOne({email});

    if (candidate){
        return res.redirect(301, '/login');
    }

    const hashedPassword = bcrypt.hashSync(password, 7);
    candidate = new User({username, email, password: hashedPassword});

    await candidate.save();

    res.redirect(301, '/login');
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    let candidate = await User.findOne({email});

    if (!candidate){
        return res.redirect(301, '/register');
    }

    console.log(password === candidate.password);

    const isPasswordCorrect = bcrypt.compareSync(password, candidate.password);
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect){
        
        return res.redirect(301, '/login');
    }

    req.session.isAuth = true;

    res.redirect('/');
}

module.exports = {
    addUser,
    loginUser
}