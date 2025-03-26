const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register : async function (req, res) {
        try {
            const selectedUser = await User.findOne({ email: req.body.email });
            if(selectedUser) return res.status(400).send('Email already exists');
            const usuario = new User({
                name : req.body.name, 
                email : req.body.email, 
                password: await bcrypt.hash(req.body.password, 10) 
            });
            await usuario.save();

            const token = jwt.sign({name: usuario.name, email : usuario.email}, process.env.SECRET_KEY, { expiresIn : '1h' });
            res.cookie('loggedToken', token, { expires: new Date(Date.now() + 3600000), httpOnly : true })

            res.redirect('/user/main')        

        } catch (error) {
            res.send(error);
        }
    },

    login : async function(req, res) {
        try {
            const selectedUser = await User.findOne({ email: req.body.email });
            if(!selectedUser) return res.status(400).send('Email or password incorrect');
            
            const passwordInput = req.body.password;
            const passwordAndUserMatch = bcrypt.compareSync(passwordInput, selectedUser.password);
            if(!passwordAndUserMatch) return res.status(400).send('Email or password incorrect');

            const token = jwt.sign({name: selectedUser.name, email : selectedUser.email}, process.env.SECRET_KEY, { expiresIn : '1h' });
            res.cookie('loggedToken', token, { expires: new Date(Date.now() + 3600000), httpOnly : true })
        
            res.redirect('/user/main')
        } catch (error) {
            res.send(error)
        }

    }
}

module.exports = userController;