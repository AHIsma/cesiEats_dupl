const Dishes = require("../schema/dish");
const helpers = require('../helpers/helpers');

// CUD (Create Update Delete) sans retour requis
const createDish = async (req, res) => {
    const verification = await helpers.verifyRestaurant(req,res);
    if (verification) {
        await Dishes.create(req.body)
        .then(() => res.json({"response": true, "answer": "Plat ajouté dans la collection."}))
        .catch(err => res.status(400).json({"response": false, "answer": err.message}));
    } else {
        res.status(400).json({"response": false, "answer": "Vous n'êtes pas autorisé à effectuer cette action."});
    }
};

const updateDish = async (req, res) => {
    const verification = await helpers.verifyRestaurant(req,res);
    if (verification) {
        await Dishes.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({"response": true, "answer": "Plat mis à jour dans la collection."}))
        .catch(err => res.status(400).json({"response": false, "answer": err.message}));
    } else {
        res.status(400).json({"response": false, "answer": "Vous n'êtes pas autorisé à effectuer cette action."});
    }
};

const deleteDish = async (req, res) => {
    const verification = await helpers.verifyRestaurant(req,res);
    if (verification) {
        await Dishes.findByIdAndDelete(req.params.id)
        .then(() => res.json({"response": true, "answer": "Plat supprimé dans la collection."}))
        .catch(err => res.status(400).json({"response": false, "answer": err.message}));
    } else {
        res.status(400).json({"response": false, "answer": "Vous n'êtes pas autorisé à effectuer cette action."});
    }
}

// R (Read) avec retour requis
const findDish = async (req, res) => {
    await Dishes.findById(req.params.id).populate('restaurant', 'user', 'dishes')
    .then(dish => {if(order !== null) res.json({"response": true, "answer": dish}); else res.status(400).json({"response": false, "answer": "Aucun plat n'existe avec cet identifiant."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
};

const findDishes = async(_req, res) => {
    await Dishes.find().populate('restaurant')
    .then(dishes => {if(dishes !== null) res.json({"response": true, "answer": dishes}); else res.status(400).json({"response": false, "answer": "Aucun plat n'existe dans la collection."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));   
};

const findDishesByRestaurant = async(req, res) => {
    const verification = await helpers.verifyRestaurant(req,res);
    if (verification) {
        await Dishes.find({restaurant: req.params.id}).select('dishes')
        .then(dishes => {if(dishes !== null) res.json({"response": true, "answer": dishes}); else res.json({"response": true, "answer": "Aucun plat n'est enregistré pour votre restaurant."})})
        .catch(err => res.status(400).json({"response": false, "answer": err.message})); 
    } else {
        res.status(400).json({"response": false, "answer": "Vous n'êtes pas autorisé à effectuer cette action."});
    }
};

module.exports = { createDish, updateDish, deleteDish, findDish, findDishes, findDishesByRestaurant }