const Orders = require("../schema/Order");

// CUD (Create Update Delete) sans retour requis
const createOrder = async (req, res) => {
    const order = new Orders(req.body);
    order.save()
    .then(() => res.json({"response": true, "answer": "Commande ajoutée dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
};

const updateOrder = async (req, res) => {
    await Orders.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({"response": true, "answer": "Commande mise à jour dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
};

const deleteOrder = async (req, res) => {
    await Orders.findByIdAndDelete(req.params.id)
    .then(() => res.json({"response": true, "answer": "Commande supprimée dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
}

// R (Read) avec retour requis
const findOrder = async (req, res) => {
    await Orders.findById(req.params.id).exec()
    .then(order => res.json({"response": true, "answer": order}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
};

const findOrders = async(res) => {
    await Orders.find().exec()
    .then(orders => res.json({"response": true, "answer": orders}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));    
};


module.exports = { createOrder, updateOrder, deleteOrder, findOrder, findOrders }