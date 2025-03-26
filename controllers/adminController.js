const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminController = {
    login : async function(req, res,) {
        try {
            const selectedUser = await User.findOne({ email: req.body.email });
            if(!selectedUser) return res.status(400).send('Email or password incorrect');
            
            const passwordInput = req.body.password;
            const passwordAndUserMatch = bcrypt.compareSync(passwordInput, selectedUser.password);
            if(!passwordAndUserMatch) return res.status(400).send('Email or password incorrect');

            if(!selectedUser.admin) return res.status(400).send('Você não é um admin')
            
            const token = jwt.sign({name: selectedUser.name, admin : selectedUser.admin}, process.env.SECRET_KEY, { expiresIn : '1h' });

            res.cookie('access_token', token, { expires: new Date(Date.now() + 3600000), httpOnly : true })
            res.redirect('/admin/administracao')
            
        } catch (error) {
            res.send(error)
        }
    },
}

module.exports = adminController; 