const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const logged = require('../controllers/loggedController')
const cookieParser = require('cookie-parser')
router.use(cookieParser());

router.get('/register', (req, res) => res.render('register', { body: {} }));
router.get('/login', (req, res) => res.render('login', { body: {} }));
router.get('/main', logged, (req, res) => res.render('main', { body : {} }));
router.get('/lista', logged, (req, res) => res.render('lista', { body : {} }));

router.post('/addUser', express.urlencoded({ extended: true }), userController.register);
router.post('/userEnter', express.urlencoded({ extended: true }), userController.login);

module.exports = router;