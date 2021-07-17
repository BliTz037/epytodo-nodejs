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
    res.status(200).json({msg: "OK"});
}

exports.deleteUser = (req, res, next) => {
    res.status(200).json({msg: "OK"});
}