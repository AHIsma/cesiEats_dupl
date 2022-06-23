var mongoose = require('mongoose');
var { Schema } = mongoose;

const Restaurants = mongoose.model('Restaurants', new mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    address: {
        type: String,
        required: true
    },
    // pas le choix, sinon le 0 du 0X disparaît
    phone:  {
        type: String,
        maximum: 10
    },
    category: {
        type: String,
        required: true
    },
    schedule: new mongoose.Schema({
        monday: {
            type: String,
            required: true
        },
        tuesday: {
            type: String,
            required: true
        },
        wednesday: {
            type: String,
            required: true
        },
        thursday: {
            type: String,
            required: true
        },
        friday: {
            type: String,
            required: true
        },
        saturday: {
            type: String,
            required: true
        },
        sunday: {
            type: String,
            required: true
        }
    }),
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dishes'}]
}));

module.exports = Restaurants;