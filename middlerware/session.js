var con = require('../config.js')

const session = (req, res,next) => {
    if(!req.cookies.user_ID){
        res.redirect('/login');
    }
    next();
}

const sessionCheck = (req, res,next) => {
    if(!req.cookies.user_ID){
        next();
    }
    res.redirect('/user');
}

const chatCheck = (req, res,next) => {
    if(!req.query.userOut_id){
        res.redirect('/user');
    }
    next();
}

module.exports = {
    session,
    sessionCheck,
    chatCheck
}