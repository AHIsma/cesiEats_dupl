var mongoose = require('mongoose');
var { Schema } = mongoose; 

const Restaurants = mongoose.model('Restaurants', new mongoose.Schema({
    address: String,
    restaurant: String,
    date: Date,
    totalPrice: Number,
    status: String
}));

module.exports = Restaurants;