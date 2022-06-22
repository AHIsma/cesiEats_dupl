var mongoose = require('mongoose');
var { Schema } = mongoose; 

const Orders = mongoose.model('Orders', new mongoose.Schema({
    user: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    restaurant: [{ type: Schema.Types.ObjectId, ref: 'Restaurants' }],
    date: Date,
    totalPrice: Number,
    status: String
}));

module.exports = Orders;