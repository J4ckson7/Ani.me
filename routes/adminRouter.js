const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const animeController = require('../controllers/animeController');
const upload = require('../config/multer')

router.get('/enter', (req, res) => res.render('enter', { body: {} }));
router.get('/tokenVerification', (req, res) => res.render('tokenVerification', { body: {}}));
router.get('/administracao', (req, res) => res.render('administration', { body: {} }));

router.post('/admEnter', express.urlencoded({ extended: true }), adminController.login);
router.post('/admTokenVerification', express.urlencoded({ extended: true }), adminController.tokenRedirect);
router.post('/addAnime', express.urlencoded({ extended : true }), upload.single('upload_file'), animeController.addAnime);
router.post('/searchEditAnime', express.urlencoded({ extended : true }), animeController.searchEditAnime);

module.exports = router;