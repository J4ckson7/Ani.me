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
            res.send( token )

        } catch (error) {
            res.send(error)
        }
    },

    tokenRedirect : function(req, res) {
        const token = req.body.token;
        
        if (!token) {
            return res.status(401).send('Token é obrigatório.');
        }
        
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.admin === true) {
                return res.redirect('/admin/administracao');
            } else {
                return res.status(401).send('Você não tem permissão para acessar essa página.');
            }
        } catch (error) {
            res.status(401).send('Token inválido ou expirado.');
            console.log(error);
        }

    }
}

module.exports = adminController;