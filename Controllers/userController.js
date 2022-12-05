var con = require('../config.js')
const shortid = require('shortid');

const user = (req, res) => {
    con.query('SELECT * FROM user WHERE ACCOUNT_ID = ?',[req.cookies.user_ID],function(error, data) {
        if (error) throw error;
        res.render("./pages/user",{ 
            user: data[0]
        });
    }); 
};

const userActive = (req, res) => {
        let listActive;
        con.query('SELECT ACCOUNT_ID, EMAIL, FNAME, LNAME, Status, src FROM user WHERE Status = \'Online\'',function(error, results) {
        if (error) throw error;
        listActive = results 
        res.send(listActive);
        })
};

module.exports = {
    userActive,
    user
}