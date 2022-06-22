var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const Users = require("../schema/User");

// CUD (Create Update Delete) sans retour requis
const createUser = async (req, res) => {
    var newUser = new Users(req.body)
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save()
    .then(() => res.status(200).json({"response": true, "answer": "Utilisateur ajouté dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}))
};

const updateUser = async (req, res) => {
    // applicable seulement dans le cas où le mot de passe venait à être changé.
    if(req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);
    await Users.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({"response": true, "answer": "Utilisateur mis à jour dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
};

const deleteUser = async (req, res) => {
    await Users.findByIdAndDelete(req.params.id)
    .then(() => res.json({"response": true, "answer": "Utilisateur supprimé dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
}

// R (Read) avec retour requis
const findUser = async (req, res) => {
    await Users.findById(req.params.id)
    .then(user => {if(user !== null) res.json({"response": true, "answer": user}); else res.status(400).json({"response": false, "answer": "Aucun utilisateur n'existe avec cet identifiant."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
};

const findUsers = async(_req, res) => {
    await Users.find()
    .then(users => {if(users !== null) res.json({"response": true, "answer": users}); else res.status(400).json({"response": false, "answer": "Aucun utilisateur n'existe au sein de la collection."})})
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));    
};

const sign_in = function(req, res) {
    Users.findOne({email: req.body.email}, function(err, user) {
      if (err) throw err.message;
      if (!user || !user.comparePassword(req.body.password)) return res.status(401).json({"response":false, "answer":'Une des valeurs renseignées est invalide. Veuillez réessayer.' });
      if (user.isLocked) return res.status(401).json({"response":false, "answer":'Vous avez été bloqué, veuillez contacter le service client pour de plus amples informations.' });
      return res.json({"response": true, "access_token": jwt.sign({ email: user.email, name: user.name, surname: user.surname, role: user.role, address: user.address, _id: user._id }, 'RESTFULAPIs') });
    });
  };
  
const loginRequired = function(req, res, next) {
    if (req.user) next();
    else return res.status(401).json({"response": "forbidden", "answer": 'Cet utilisateur ne possède pas les autorisations nécessaires pour accéder à cette ressource.' });
  };

const profile = function(req, res, next) {
    if (req.user) {
      res.send(req.user);
      next();
    } else return res.status(401).json({'response': false, "answer": 'Les données utilisateurs sont erronées.' });
  };

module.exports = { createUser, updateUser, deleteUser, findUser, findUsers, sign_in, loginRequired, profile }