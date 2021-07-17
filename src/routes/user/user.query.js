const db = require('../../config/db').connection;

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
    res.status(200).json({msg: "OK"});
}

exports.updateUser = (req, res, next) => {
    res.status(200).json({msg: "OK"});
}

exports.deleteUser = (req, res, next) => {
    res.status(200).json({msg: "OK"});
}