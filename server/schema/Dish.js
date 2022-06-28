var mongoose = require('mongoose');
var { Schema } = mongoose;

const Dishes = mongoose.model('Dishes', new mongoose.Schema({
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurants' },
    name: String,
    price: Number,
    description: String,
    imageLink: String,
    toppings: [ new mongoose.Schema ({
        name: String,
        quantity: Number,
        needsPrice: Boolean,
        price: Number | null
    })],
    drinks: [ new mongoose.Schema ({
        name: String
    })],
    pastry: [{
        name: String,
        quantity: Number,
        needsPrice: Boolean,
        price: Number | null
    }]
}));

module.exports = Dishes;