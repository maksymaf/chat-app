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

    const isPasswordCorrect = bcrypt.compareSync(password, candidate.password);
    if (!isPasswordCorrect){        
        return res.redirect('/login');
    }

    req.session.isAuth = true;
    req.session.save((err) => {
        if (err){
            console.log('Session saving failed', err.message);
            return res.redirect('/login');
        }

        console.log('Session has been successfuly saved');
        return res.redirect('/');
    })
}

module.exports = {
    addUser,
    loginUser
}
