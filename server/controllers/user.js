var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Users = require("../schema/User");
var helpers = require('../helpers/helpers');
const BlacklistedToken = require('../schema/BlacklistedToken');

// CUD (Create Update Delete) sans retour requis
const createUser = async (req, res) => {
    var newUser = new Users(req.body)
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save()
    .then(() => res.status(200).json({"response": true, "answer": "Utilisateur ajouté dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}))
};

const updateUser = async (req, res) => {
  const verification = helpers.verifyUser(req, res);
  if (verification) {
    // applicable seulement dans le cas où le mot de passe venait à être changé.
    if(req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);
    await Users.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({"response": true, "answer": "Utilisateur mis à jour dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
  } else {
    return res.status(401).json({'response': false, "answer": "Vous n'êtes pas autorisé à consulter cette ressource." })
  }
};

const deleteUser = async (req, res) => {
  const verification = helpers.verifyUser(req, res);
  if(verification) {
    Users.findByIdAndDelete(req.params.id)
    .then(() => res.json({"response": true, "answer": "Utilisateur supprimé dans la collection."}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
  } else {
    return res.status(401).json({'response': false, "answer": "Vous n'êtes pas autorisé à consulter cette ressource." })
  }
}

// R (Read) avec retour requis
const findUser = async (req, res) => {
  const verification = helpers.verifyUser(req, res);
  if(verification) {
        Users.findById(req.params.id)
        .then(user => {if(user !== null) res.json({"response": true, "answer": user}); else res.status(400).json({"response": false, "answer": "Aucun utilisateur n'existe avec cet identifiant."})})
        .catch(err => res.status(400).json({"response": false, "answer": err.message}));
  } else {
    return res.status(401).json({'response': false, "answer": "Vous n'êtes pas connecté." })
  }; 
};

const findUsers = async(req, res) => {
  const verification = helpers.verifyifAdmin(req, res);
  console.log(verification);
  if(verification) {
    Users.find({})
    .then(users => res.json({"response": true, "answer": users}))
    .catch(err => res.status(400).json({"response": false, "answer": err.message}));
  } else {
    return res.status(401).json({'response': false, "answer": "Vous n'êtes pas autorisé à consulter cette ressource." })
  }
}

const sign_in = function(req, res) {
    Users.findOne({email: req.body.email}, function(err, user) {
      if (err) throw err.message;
      if (user.isLocked) return res.status(401).json({"response":false, "answer":'Vous avez été bloqué, veuillez contacter le service client pour de plus amples informations.' });
      if (!user || !user.comparePassword(req.body.password)) return res.status(401).json({"response":false, "answer":'Une des valeurs renseignées est invalide. Veuillez réessayer.' });
      else {
        var connection = Date.now();
        Users.updateOne({email: req.body.email}, {$push: {connections: connection}})
        Users.updateOne({email: req.body.email}, {$set: {lastConnectedAt: connection}})
        res.cookie('access_token', jwt.sign({ email: user.email, name: user.name, surname: user.surname, role: user.role, address: user.address, _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' }))
      }
      return res.json({"response": true, "answer": "Connecté !"});
    });
  };

const sign_out = function(req, res) {
  BlacklistedToken.create({token: req.cookies['access_token']})
  res.clearCookie('access_token');
  return res.status(200).json({'response': true, 'answer': "Déconnecté."})
}

module.exports = { createUser, updateUser, deleteUser, findUser, findUsers, sign_in, sign_out }