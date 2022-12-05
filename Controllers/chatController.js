var con = require('../config.js')
const shortid = require('shortid');

const chatView = (req, res) => {
    con.query('SELECT * FROM user WHERE ACCOUNT_ID = ?',[req.query.userOut_id],function(err, data){
        if (err) throw err;
        res.render("./pages/chat", {
            user_chat: data[0],
            ID_in: req.cookies.user_ID
        });
});
}
      
const sendMessage = (req, res) => {
    con.query('INSERT INTO message (ID_INCOMING, ID_OUTGOING, Message) VALUES (?,?,?)',[req.body.ID_INCOMING,req.body.ID_OUTGOING,req.body.Mess],function(error, results, fields) {
        if (error) throw error;})
    res.send(req.body.Mess);
}

const getMessage = (req, res) => {
    let code;
    con.query('SELECT * FROM message WHERE ((ID_INCOMING = ?) AND (ID_OUTGOING = ?)) OR ((ID_INCOMING = ?) AND (ID_OUTGOING = ?))',[req.body.ID_INCOMING,req.body.ID_OUTGOING,req.body.ID_OUTGOING, req.body.ID_INCOMING],function(err, data){
        if (err) throw err;
        code = data;
        res.send(code);
        })
}

module.exports = {
    chatView,
    sendMessage,
    getMessage
}