const isAuth = (req, res, next) => {
    if (req.session.isAuth){
        next();
    }else{
        return res.redirect(301, '/login');
    }
}

module.exports = {
    isAuth,
}
