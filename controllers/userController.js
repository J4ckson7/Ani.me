const User = require('../models/User');
const bcrypt = require('bcrypt');

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
            res.redirect('user/main')        

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

            res.redirect('/user/main')
        } catch (error) {
            res.send(error)
        }

    }
}

module.exports = userController;