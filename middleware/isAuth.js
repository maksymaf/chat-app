const isAuth = (req, res, next) => {
    console.log(req.session);
    if (req.session.isAuth){
        next();
    }else{
        return res.redirect('/login');
    }
}

module.exports = {
    isAuth,
}
