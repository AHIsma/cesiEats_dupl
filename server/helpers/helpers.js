const jwt = require('jsonwebtoken');
// permet de simplifier les opérations de vérification

// vérification administrateur (pour sécuriser les entrypoints /users, /restaurants, /orders, /dishes)
const verifyifAdmin = function(req, res) {
    jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({'response': false, "answer": "Vous n'êtes pas autorisé à consulter cette ressource." })
        if (user.role === 'admin') return true
        return false
    });
};

// vérification utilisateur (ou admin) (pour sécuriser les entrypoints utilisateurs lambda)
const verifyUser = function (req,res) {
    jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({'response': false, "answer": "Vous n'êtes pas autorisé à consulter cette ressource." })
        if (user.role === 'admin' || user._id === req.params.id) return true
        return false
    })
}

// vérification restaurant (ou admin) (pour sécuriser les entrypoints restaurants)
const verifyRestaurant = function (req,res) {
    jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({'response': false, "answer": "Vous n'êtes pas autorisé à consulter cette ressource." })
        if (user.role === 'restaurant' || user._id === req.params.id) return true
        return false
    })
}

// vérification livreur (ou admin) (pour sécuriser les entrypoints livreurs)
const verifyDeliverer = function (req,res) {
    jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({'response': false, "answer": "Vous n'êtes pas autorisé à consulter cette ressource." })
        if (user.role === 'deliverer' || user._id === req.params.id) return true
        return false
    })
}


module.exports = { verifyUser, verifyifAdmin, verifyRestaurant, verifyDeliverer }