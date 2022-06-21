var express = require('express');
var router = express.Router();
const { findUser, findUsers, createUser, updateUser, deleteUser } = require('../controllers/user');

/* Users CRUD */
router.get('/', findUsers)
.post('/add', createUser)
.get('/:id', findUser)
.put('/update/:id', updateUser)
.delete('/delete/:id', deleteUser);

module.exports = router;
