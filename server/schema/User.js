var mongoose = require('mongoose'); 
var { Schema } = mongoose;

const Users = mongoose.model('Users', new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    role: String,
    address: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Orders', default: null}]
}));

module.exports = Users;