const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(403).json({ error: "No token, authorization denied" });
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId)
            throw 'Token is not valid';
        else
            next();
    } catch (e) {
        console.error(e);
        res.status(403).json({ error: e });
    }
}