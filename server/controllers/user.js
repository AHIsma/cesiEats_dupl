const Users = require("../schema/User");

// CUD (Create Update Delete) sans retour requis
const createUser = async (req, res) => {
    await Users.create(req.body)
    .then(() => res.json({"response": true, "answer": "Utilisateur ajouté dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
};

const updateUser = async (req, res) => {
    await Users.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({"response": true, "answer": "Utilisateur mis à jour dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
};

const deleteUser = async (req, res) => {
    await Users.findByIdAndDelete(req.params.id)
    .then(() => res.json({"response": true, "answer": "Utilisateur supprimé dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
}

// R (Read) avec retour requis
const findUser = async (req, res) => {
    await Users.findById(req.params.id).exec()
    .then(user => res.json({"response": true, "answer": user}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));
};

const findUsers = async(res) => {
    await Users.find().exec()
    .then(users => res.json({"response": true, "answer": users}))
    .catch(err => res.status(400).json({"response": false, "answer": err}));    
};


module.exports = { createUser, updateUser, deleteUser, findUser, findUsers }