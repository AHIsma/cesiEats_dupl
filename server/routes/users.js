var express = require('express');
var router = express.Router();
const { findUser, findUsers, createUser, updateUser, deleteUser, sign_in, sign_out, profile } = require('../controllers/user');

/* Users CRUD + Login */
router.get('/', findUsers)
.post('/add', createUser)
.post('/login', sign_in)
.get('/logout', sign_out)
.get('/me', profile)
.get('/:id', findUser)
.put('/update/:id', updateUser)
.delete('/delete/:id', deleteUser)

module.exports = router;
