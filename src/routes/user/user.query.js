const db = require('../../config/db').connection;
const bcrypt = require('bcrypt');

exports.getAllUsersInfo = (req, res, next) => {
    const sql = `SELECT * FROM user`;
    db.query(sql, function(err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "internal server error" });
        }
        res.status(200).json(results);
    })
}

exports.getUserTodos = (req, res, next) => {
    const sql = `SELECT * FROM todo`;
    db.query(sql, function(err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "internal server error" });
        }
        res.status(200).json(results);
    })
}

exports.getUserInfo = (req, res, next) => {
    let sql = `SELECT * FROM user WHERE '${req.params.id}' IN(id, email)`;

    console.log(req.params);
    if (!req.params.hasOwnProperty('id'))
        return res.status(400).json({msg: "Missing parameter"});
    db.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "internal server error" });
        }
        if (result.length === 0)
            return res.status(404).json({msg: "User not found"});
        res.status(200).json(result);
    })
}

exports.updateUser = (req, res, next) => {
    if (!req.params.hasOwnProperty('id'))
        return res.status(400).json({msg: "Missing parameter"});
        console.log(req.body);
    if (!req.body.hasOwnProperty("email") ||
        !req.body.hasOwnProperty("password") ||
        !req.body.hasOwnProperty("firstname") ||
        !req.body.hasOwnProperty("name"))
        return res.status(400).json({msg: "Missing parameter"});
    
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const sql = `UPDATE user SET email = '${req.body.email}', password = '${hash}', firstname = '${req.body.firstname}', name = '${req.body.name}' WHERE id = '${req.params.id}'`;
        db.query(sql, function(err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "internal server error" });
            }
            if (result.affectedRows === 0)
                return res.status(404).json({ msg: "User not found"});
            db.query(`SELECT * FROM user WHERE id = '${req.params.id}'`, function(err, result) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ msg: "internal server error" });
                }
                res.status(200).json(result);
            })
        })
    })
    .catch(error => res.status(500).json({ error }));
}

exports.deleteUser = (req, res, next) => {
    if (!req.params.hasOwnProperty('id'))
        return res.status(400).json({msg: "Missing parameter"});
    const sql = `DELETE FROM user WHERE id = '${req.params.id}'`;
    db.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "internal server error" });
        }
        if (result.affectedRows === 0)
            return res.status(404).json({ msg: "User not found"});
        res.status(200).json({msg : `succesfully deleted record number: ${req.params.id}`});
    });
}