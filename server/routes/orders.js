var express = require('express');
var router = express.Router();
const { findOrder, findOrders, createOrder, updateOrder, deleteOrder } = require('../controllers/order');

/* Orders CRUD */
router.get('/', findOrders)
.post('/add', createOrder)
.get('/:id', findOrder)
.put('/update/:id', updateOrder)
.delete('/delete/:id', deleteOrder);

module.exports = router;
