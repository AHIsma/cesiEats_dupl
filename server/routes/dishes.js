var express = require('express');
var router = express.Router();
const { findDish, findDishes, createDish, updateDish, deleteDish, findDishesByRestaurant } = require('../controllers/dish');

/* Dishes CRUD */
router.get('/', findDishes)
.post('/add', createDish)
.get('/:id', findDish)
.put('/update/:id', updateDish)
.delete('/delete/:id', deleteDish)
.get('/dishspec', findDishesByRestaurant);

module.exports = router;