const db = require('../../config/db').connection;

exports.getAllUsersInfo = (req, res, next) => {
    res.status(200).json({msg: "OK"});
}