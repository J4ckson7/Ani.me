const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/register', (req, res) => res.render('register', { body: {} }));
router.get('/login', (req, res) => res.render('login', { body: {} }));
router.get('/main', (req, res) => res.send('Usuário criado | Logado'));

router.post('/addUser', express.urlencoded({ extended: true }), userController.register);
router.post('/userEnter', express.urlencoded({ extended: true }), userController.login);

module.exports = router;