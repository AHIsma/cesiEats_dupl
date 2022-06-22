const Orders = require("../schema/Order");

// CUD (Create Update Delete) sans retour requis
const createOrder = async (req, res) => {
    const order = new Orders(req.body);
    order.save()
    .then(() => res.json({"response": true, "answer": "Commande ajoutée dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
};

const updateOrder = async (req, res) => {
    await Orders.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({"response": true, "answer": "Commande mise à jour dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
};

const deleteOrder = async (req, res) => {
    await Orders.findByIdAndDelete(req.params.id)
    .then(() => res.json({"response": true, "answer": "Commande supprimée dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
}

// R (Read) avec retour requis
const findOrder = async (req, res) => {
    await Orders.findById(req.params.id)
    .then(order => {if(order !== null) res.json({"response": true, "answer": order}); else res.status(400).json({"response": false, "answer": "Aucune commande n'existe avec cet identifiant."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
};

const findOrders = async(_req, res) => {
    await Orders.find()
    .then(orders => {if(orders !== null) res.json({"response": true, "answer": orders}); else res.status(400).json({"response": false, "answer": "Aucune commande n'existe dans la collection."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));   
};

const findOrdersByRestaurant = async(req, res) => {
    // besoin de voir comment les données sont manipulables après login
    await Orders.find({restaurant: req.user._id})
    .then(orders => {if(orders !== null) res.json({"response": true, "answer": orders}); else res.json({"response": true, "answer": "Aucune commande n'est disponible pour votre restaurant."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message})); 
};

module.exports = { createOrder, updateOrder, deleteOrder, findOrder, findOrders, findOrdersByRestaurant }