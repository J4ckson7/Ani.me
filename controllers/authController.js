const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const auth_token = req.cookies.access_token;
    console.log(auth_token)

    if(!auth_token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const decoded = jwt.decode(auth_token)
        if (!decoded) {
            return res.status(401).send('Invalid token');
        }

        const userVerified = jwt.verify(auth_token, process.env.SECRET_KEY);
        if(userVerified.admin === true){
            next();
        } else {
            return res.status(403).send('Acesso restrito a administradores');
        }
        
    } catch (error) {
        res.status(401).send('Access Denied');
    }
}