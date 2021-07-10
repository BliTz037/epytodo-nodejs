const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db').connection;

exports.signup = (req, res, next) => {
    if (!req.body.hasOwnProperty('email') ||
        !req.body.hasOwnProperty('password') ||
        !req.body.hasOwnProperty('name') ||
        !req.body.hasOwnProperty('firstname'))
        return res.status(400).json({ msg: "Missing parameter" });
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const sql = `INSERT INTO user (email, password, name, firstname) VALUES ('${req.body.email}', '${hash}', '${req.body.name}', '${req.body.firstname}')`
        db.query(sql, function(err, results) {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY')
                    return res.status(409).json({ msg: "account already exists" });
                else {
                    console.error(err);
                    return res.status(500).json({ msg: "internal server error" });
                }
            }
            res.status(201).json({token: jwt.sign({ userId: results.insertId}, process.env.SECRET,
            { expiresIn: '24h'})});
        })
    })
    .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res, next) => {
    if (!req.body.hasOwnProperty('email') ||
        !req.body.hasOwnProperty('password'))
        return res.status(400).json({ msg: "Missing parameter" });
    const sql = `SELECT id, email, password FROM user WHERE email = '${req.body.email}'`;
    db.query(sql, function(err, results) {
        if (err) {
            res.status(500).json({ msg: "internal server error"})
            throw err;
        }
        if (results.length === 0)
            return res.status(404).json({ msg: "Invalid Credentials" });
        const resp = results[0];
        bcrypt.compare(req.body.password, resp.password)
        .then(valid => {
            if (!valid)
                return res.status(401).json({ msg: "Invalid Credentials"})
            res.status(200).json({token: jwt.sign({userId: resp.id}, process.env.SECRET,
            { expiresIn: '24h'})});
        })
        .catch(error => res.status(500).json({error}));
    })
}