const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const loggedToken = req.cookies.loggedToken;

    if (!loggedToken) {
        return res.status(401).send('É necessário estar logado');
    }

    try {
        const decoded = jwt.verify(loggedToken, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).send('É necessário estar logado');
        }
        next();
    } catch (error) {
        res.status(401).send('É necessário estar logado');
    }
};
