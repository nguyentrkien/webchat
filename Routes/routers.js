//js
const express = require('express');
const {loginView, loginConfirm, logoutConfirm} = require('../Controllers/loginController');
const {registerView, registerConfirm} = require('../Controllers/registerController');
const {userActive, user} = require('../Controllers/userController');
const {chatView,  sendMessage, getMessage} = require('../Controllers/chatController');
const homeView = require('../Controllers/homeView');
const {session, sessionCheck, chatCheck} = require('../middlerware/session');
const router = express.Router();

router.get('/',homeView);


router.get('/register', registerView);
router.post('/register', registerConfirm);
//login area
router.get('/login', sessionCheck, loginView);
router.post('/login', loginConfirm);
// user area
router.get('/user',session, user);
router.get('/userActive',userActive);       
// chat area
router.get('/chat',chatCheck, chatView);
router.post('/sendChat',sendMessage);
router.post('/getChat',getMessage);
// logout
router.get('/logout',logoutConfirm);


module.exports = router;