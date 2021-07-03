const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const todoCtrl = require('./todos.query');

router.post('/', auth, todoCtrl.createTodo);
router.put('/:id', auth, todoCtrl.updateTodo);
router.get('/' + '', auth, todoCtrl.getAllTodo);
router.get('/:id', auth, todoCtrl.getTodo);
router.delete('/:id', auth, todoCtrl.deleteTodo);

module.exports = router;