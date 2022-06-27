const Orders = require("../schema/Order");
const Users = require("../schema/User")

// CUD (Create Update Delete) sans retour requis
const createOrder = async (req, res) => {
    new Orders(req.body).save((err, pushedorder) => {
        Users.findOneAndUpdate({id: req.body.user}, {$push: {orders: pushedorder.id}})
        .then(res.json({"response": true, "answer": "Commande ajoutée dans la collection."}))
        .catch(err => res.status(400).json({"response": false, "answer": err.message}));
    });
};

const updateOrder = async (req, res) => {
    const verification = await helpers.verifyUser(req, res);
    if (verification) {
        await Orders.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({"response": true, "answer": "Commande mise à jour dans la collection."}))
        .catch(err => res.status(400).json({"response": false, "answer": err.message}));
    } else {
        res.status(400).json({"response": false, "answer": "Vous n'êtes pas autorisé à effectuer cette action."});
    }
};

const deleteOrder = async (req, res) => {
    await Orders.findByIdAndDelete(req.params.id)
    .then(() => res.json({"response": true, "answer": "Commande supprimée dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
}

// R (Read) avec retour requis
const findOrder = async (req, res) => {
    await Orders.findById(req.params.id).populate('restaurant', 'user', 'dishes')
    .then(order => {if(order !== null) res.json({"response": true, "answer": order}); else res.status(400).json({"response": false, "answer": "Aucune commande n'existe avec cet identifiant."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
};

const findOrders = async(_req, res) => {
    await Orders.find().populate()
    .then(orders => {if(orders !== null) res.json({"response": true, "answer": orders}); else res.status(400).json({"response": false, "answer": "Aucune commande n'existe dans la collection."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));   
};

const findOrdersByRestaurant = async(req, res) => {
    await Orders.find({restaurant: req.user._id}).populate()
    .then(orders => {if(orders !== null) res.json({"response": true, "answer": orders}); else res.json({"response": true, "answer": "Aucune commande n'est disponible pour ce restaurant."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message})); 
};

const findOrdersByUser = async(req, res) => {
    await Orders.find({user: req.user._id}).populate()
    .then(orders => {if(orders !== null) res.json({"response": true, "answer": orders}); else res.json({"response": true, "answer": "Aucune commande n'est disponible pour cet utilisateur."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message})); 
};

module.exports = { createOrder, updateOrder, deleteOrder, findOrder, findOrders, findOrdersByRestaurant, findOrdersByUser }