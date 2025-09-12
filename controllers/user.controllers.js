const User = require('../models/User.model');

const addUser = async (req, res) => {
    const {username, email, password} = req.body;

    let candidate = await User.findOne({email});

    if (candidate){
        return res.redirect(301, '/login');
    }

    candidate = new User({username, email, password});

    await candidate.save();
}

module.exports = {
    addUser,
}