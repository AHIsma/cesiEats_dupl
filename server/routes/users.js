var express = require('express');
var router = express.Router();
const { findUser, findUsers, createUser, updateUser, deleteUser, sign_in } = require('../controllers/user');

/* Users CRUD + Login */
router.get('/', findUsers)
.post('/add', createUser)
.post('/login', sign_in)
.get('/:id', findUser)
.put('/update/:id', updateUser)
.delete('/delete/:id', deleteUser);

module.exports = router;
