var con = require('../config.js')
const shortid = require('shortid');
var md5 = require('md5');

const registerView = (req, res) => {
    res.render("./pages/register", {
        warningMessage: null
    } );
}

const registerConfirm = (req, res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
	let email = req.body.email;
    let image = req.body.image;
    let password = req.body.password;
    if (validateEmail(email)) {
        if (fname && lname && email && password){
            con.query('SELECT * FROM user',function(err, data){
                const check = data.some(element => element.EMAIL == email);
                if(!check){
                    con.query('INSERT INTO user (ACCOUNT_ID,FNAME, LNAME, EMAIL, Pass, src) VALUES (?,?,?,?,?,?)',[shortid.generate(),fname,lname,email,md5(password),image],function(error, results, fields) {
                    if (error) throw error;
                    res.render('./pages/login',{
                        message: "Register successfully!!! Please login your account",
                        warningMessage: null
                    });
                });
                }
                else{
                    res.render('./pages/register',{
                        warningMessage: "Email is existed !!!"
                    });
                }
            }); 
        }
    }
    else {
        res.render('./pages/register',{
        warningMessage: "Email is not valid !!!"
        });
    }
    
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

module.exports = {
    registerView,
    registerConfirm
}