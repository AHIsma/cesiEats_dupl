var mongoose = require('mongoose');

const Restaurants = mongoose.model('Restaurants', new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    category: String,
    schedule: Date,
    dishes: new mongoose.Schema({
        name: String,
        price: Number,
        description: String,
        imageLink: String,
        toppings: new mongoose.Schema({
            name: String,
            quantity: Number,
            needsPrice: Boolean,
            price: Number | null
        })
    })
}));

module.exports = Restaurants;