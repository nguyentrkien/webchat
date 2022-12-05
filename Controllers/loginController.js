//js
var con = require('../config.js')
var md5 = require('md5');
const shortid = require('shortid');


// For View 
const loginView = (req, res) => {
    res.render("./pages/login", {
        message: null,
        warningMessage: null
    } );
}

const loginConfirm = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    con.query('SELECT * FROM user',function(err, data){
        if (err) throw err;
        const check = data.some(element => element.EMAIL == email && element.Pass == md5(password));
        if (check){
            let user = data.find(element => element.EMAIL == email && element.Pass == md5(password));   
            con.query('UPDATE user SET Status = \'Online\' WHERE ACCOUNT_ID = ?',[user.ACCOUNT_ID],function(error) {
                if (error) throw error;
            });           
            res.cookie('user_ID',user.ACCOUNT_ID);
            res.redirect("/user");
            
        }
        else {
            res.render("./pages/login", {
                message: null,
                warningMessage: "Invalid Email or Password is incorrected!"
            });
        }      
        });  
}

const logoutConfirm = (req, res) => {
    con.query('UPDATE user SET Status = \'Offline\' WHERE ACCOUNT_ID = ?',[req.cookies.user_ID],function(error, results, fields) {
        if (error) throw error; 
    }); 
    res.clearCookie('user_ID');    
    res.redirect("/login");   
}

module.exports =  {
    loginView,
    loginConfirm,
    logoutConfirm,
};