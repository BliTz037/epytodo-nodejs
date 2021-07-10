const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token)
            throw "No token, authorization denied";
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId)
            throw 'Token is not valid';
        else
            next();
    } catch (err) {
        res.status(403).json({
            error: new Error(err)
        });
    }
}