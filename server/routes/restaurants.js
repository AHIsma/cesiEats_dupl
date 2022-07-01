var express = require('express');
var router = express.Router();
const { 
    findRestaurant, 
    findRestaurants, 
    findRestaurantsByLocation,  
    createRestaurant, 
    updateRestaurant, 
    deleteRestaurant, 
    filterRestaurants 
} = require('../controllers/restaurant');

/* Restaurants CRUD */
router.get('/', findRestaurants)
.post('/add', createRestaurant)
.post('/findByLocation', findRestaurantsByLocation)
.get('/:id', findRestaurant)
.put('/update/:id', updateRestaurant)
.delete('/delete/:id', deleteRestaurant)
.post('/filter', filterRestaurants);

module.exports = router;
