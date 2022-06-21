var mongoose = require('mongoose');
var { Schema } = mongoose; 

const Orders = mongoose.model('Orders', new mongoose.Schema({
    user: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    restaurant: String,
    date: Date,
    totalPrice: Number,
    status: String
}));

module.exports = Orders;