const Restaurants = require("../schema/Restaurant");
const helpers = require('../helpers/helpers');

// CUD (Create Update Delete) sans retour requis
const createRestaurant = async (req, res) => {
    await Restaurants.create(req.body)
    .then(() => res.json({"response": true, "answer": "Restaurant ajouté dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
};

const updateRestaurant = async (req, res) => {
    const verification = await helpers.verifyRestaurant(req,res);
    if (verification) {
        await Restaurants.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({"response": true, "answer": "Restaurant mis à jour dans la collection."}))
        .catch(err => res.status(400).json({"response": false, "answer": err.message}));
    } else {
        res.status(400).json({"response": false, "answer": "Vous n'êtes pas autorisé à consulter cette ressource."});
    }
};

const deleteRestaurant = async (req, res) => {
    const verification = await helpers.verifyRestaurant(req,res);
    if (verification) {
        await Restaurants.findByIdAndDelete(req.params.id)
        .then(() => res.json({"response": true, "answer": "Restaurant supprimé de la collection."}))
        .catch(err => res.status(400).json({"response": false, "answer": err.message}));
    } else {
        res.status(400).json({"response": false, "answer": "Vous n'êtes pas autorisé à consulter cette ressource."});
    } 
}

// R (Read) avec retour requis
const findRestaurant = async (req, res) => {
    await Restaurants.findById(req.params.id)
    .then(restaurant => {if(restaurant !== null) res.json({"response": true, "answer": restaurant}); else res.status(400).json({"response": false, "answer": "Le restaurant que vous recherchez n'existe pas."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));  
};

const findRestaurants = async(_req, res) => {
    await Restaurants.find()
    .then(restaurants => {if(restaurants === "[]") res.json({"response": true, "answer": restaurants}); else res.status(400).json({"response": false, "answer": "Aucun restaurant n'est disponible dans la collection."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));   
};


module.exports = { createRestaurant, updateRestaurant, deleteRestaurant, findRestaurant, findRestaurants }