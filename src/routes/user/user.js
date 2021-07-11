const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const userCtrl = require('./user.query');

router.get('/', auth, userCtrl.getAllUsersInfo);
// router.get('/todos', auth, userCtrl.getUserTodos);
// router.get('/:id', auth, userCtrl.getUserInfo);
// router.get('/:email', auth, userCtrl.getUserInfo);
// router.put('/:id ', auth, userCtrl.updateUser);
// router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;