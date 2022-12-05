//js

//For Register Page
var con = require('../config.js');

const homeView = (req, res) => {
    res.render("./pages/home");
}

module.exports =  homeView;