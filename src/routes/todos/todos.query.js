const db = require('../../config/db').connection;

exports.createTodo = (req, res, next) => {
    //todo / in progress / done
    if (!req.body.hasOwnProperty('title') ||
        !req.body.hasOwnProperty('description') ||
        !req.body.hasOwnProperty('due_time') ||
        !req.body.hasOwnProperty('user_id') ||
        !req.body.hasOwnProperty('status'))
        return res.status(400).json({msg: "Missing parameter"});
    if (Date.parse(req.body.due_time) == NaN)
        return res.status(400).json({msg: "Bad datetime"});
    if (!["todo", "in progress", "done"].includes(req.body.status))
        return res.status(400).json({msg: "Bad status"});
    const sql = `INSERT INTO todo (title, description, due_time, user_id, status)
    VALUES ('${req.body.title}',
            '${req.body.description}',
            '${req.body.due_time}',
            '${req.body.user_id}',
            '${req.body.status}')`;
    db.query(sql, function(err, result) {
        if (err) {
            if (err.code == 'ER_TRUNCATED_WRONG_VALUE')
                return res.status(400).json({msg: "Bad parameter"});
            console.error(err);
            return res.status(500).json({ msg: "internal server error" });
        }
        res.status(201).json(result);
    })
}

exports.updateTodo = (req, res, next) => {

}

exports.getAllTodo = (req, res, next) => {
    const sql = `SELECT * FROM todo`;

    db.query(sql, function(err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "internal server error" });
        }
        res.status(200).json(results);
    })
}

exports.getTodo = (req, res, next) => {
    let sql = `SELECT * FROM todo WHERE id = '${req.params.id}'`;

    if (!req.params.hasOwnProperty('id'))
        return res.status(400).json({msg: "Missing parameter"});
    db.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "internal server error" });
        }
        if (result.length === 0)
            return res.status(404).json({msg: "Todo not found"});
        res.status(200).json(result);
    })
}

exports.deleteTodo = (req, res, next) => {
    if (!req.params.hasOwnProperty('id'))
        return res.status(400).json({msg: "Missing parameter"});
    const sql = `DELETE FROM todo WHERE id = '${req.params.id}'`;
    db.query(sql, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "internal server error" });
        }
        if (result.affectedRows === 0)
            return res.status(404).json({ msg: "Todo not found"});
        res.status(200).json({msg : `succesfully deleted record number: ${req.params.id}`});
    });
}