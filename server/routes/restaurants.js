var express = require('express');
var router = express.Router();
const { findRestaurant, findRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurant');

/* Restaurants CRUD */
router.get('/', findRestaurants)
.post('/add', createRestaurant)
.get('/:id', findRestaurant)
.put('/update/:id', updateRestaurant)
.delete('/delete/:id', deleteRestaurant);

module.exports = router;
