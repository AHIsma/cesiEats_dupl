const Restaurants = require("../schema/Restaurant");

// CUD (Create Update Delete) sans retour requis
const createRestaurant = async (req, res) => {
    const restaurant = new Restaurants(req.body);
    restaurant.save()
    .then(() => res.json({"response": true, "answer": "Restaurant ajouté dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
};

const updateRestaurant = async (req, res) => {
    await Restaurants.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({"response": true, "answer": "Restaurant mis à jour dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
};

const deleteRestaurant = async (req, res) => {
    await Restaurants.findByIdAndDelete(req.params.id)
    .then(() => res.json({"response": true, "answer": "Restaurant supprimé de la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
}

// R (Read) avec retour requis
const findRestaurant = async (req, res) => {
    await Restaurants.findById(req.params.id).exec()
    .then(restaurant => res.json({"response": true, "answer": restaurant}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
};

const findRestaurants = async(res) => {
    await Restaurants.find().exec()
    .then(restaurants => res.json({"response": true, "answer": restaurants}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));    
};


module.exports = { createRestaurant, updateRestaurant, deleteRestaurant, findRestaurant, findRestaurants }