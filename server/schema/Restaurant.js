var mongoose = require('mongoose');

const Restaurants = mongoose.model('Restaurants', new mongoose.Schema({
    name: { type: String, required: true },
    street: { type: String, required: true },
    streetNo: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: false, default: null },
    // pas le choix, les codes postaux qui commencent par 0 
    // seront considérés comme invalides si de type Number
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    imageUrl: { type: String },
    // pas le choix, sinon le 0 du 0X disparaît
    phone: { type: String, maximum: 10 },
    category: { type: String, required: true },
    schedule: {
        monday: { type: String, required: true },
        tuesday: { type: String, required: true },
        wednesday: { type: String, required: true },
        thursday: { type: String, required: true },
        friday: { type: String, required: true },
        saturday: { type: String, required: true },
        sunday: { type: String, required: true }
    },
    dishes: [{ type: {
        name: String,
        price: Number,
        description: String,
        imageLink: String,
        toppings: [{ type: {
            name: String,
            quantity: Number,
            needsPrice: Boolean,
            price: Number | null
        } }],
        drinks: [{ type: {
            name: String
        } }],
        pastry: [{ type: {
            name: String,
            quantity: Number,
            needsPrice: Boolean,
            price: Number | null
        } }],
    }}]
}));

module.exports = Restaurants;