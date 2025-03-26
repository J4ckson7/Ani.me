const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const animeController = require('../controllers/animeController');
const auth = require('../controllers/authController')
const upload = require('../config/multer')
const cookieParser = require('cookie-parser')
router.use(cookieParser());

router.get('/enter', (req, res) => res.render('enter', { body: {} }));
// router.get('/tokenVerification', (req, res) => res.render('tokenVerification', { body: {}}));
router.get('/administracao', auth, (req, res) => res.render('administration', { body: {} }));
router.get('/edit/:id', auth, (req, res) => res.render('edit', { body : { id : req.params.id }}));
router.get('/delete/:id', auth, (req, res) => res.render('delete', { body : { id : req.params.id } }));

router.post('/admEnter', express.urlencoded({ extended: true }), adminController.login);
// router.post('/admTokenVerification', express.urlencoded({ extended: true }), adminController.tokenRedirect);
router.post('/addAnime', express.urlencoded({ extended : true }), upload.single('upload_file'), animeController.addAnime);
router.post('/searchEditAnime', express.urlencoded({ extended : true }), animeController.searchEditAnime);
router.post('/editAnime/:id', express.urlencoded({ extended : true }), animeController.editAnime);
router.post('/searchDelAnime', express.urlencoded({ extended : true }), animeController.searchDelAnime)
router.post('/delete/:id', express.urlencoded({ extended : true }), animeController.delAnime);

module.exports = router;