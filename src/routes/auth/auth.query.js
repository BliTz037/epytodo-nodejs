const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db').connection;

exports.signup = (req, res, next) => {
    console.log(req.body);
    if (!req.body.hasOwnProperty('email') ||
        !req.body.hasOwnProperty('password') ||
        !req.body.hasOwnProperty('name') ||
        !req.body.hasOwnProperty('firstname'))
        return res.status(500).json({ msg: "Missing parameter" });
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const sql = `INSERT INTO user (email, password, name, firstname) VALUES ('${req.body.email}', '${hash}', '${req.body.name}', '${req.body.firstname}')`
        db.query(sql, function(err, results) {
            if (err) {
                res.status(500).json({ msg: "Internal error" })
                throw err;
            }
            res.status(201).json({token: jwt.sign({ userId: results.insertId}, process.env.SECRET,
            { expiresIn: '24h'})});
        })
    })
    .catch(error => res.status(500).json({ error }));
}