const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;
// permet de simplifier les opérations de vérification

// vérification administrateur (pour sécuriser les entrypoints /users, /restaurants, /orders, /dishes)
async function verifyifAdmin(req) {
    let result = "";
    if(req.cookies['access_token'] !== undefined) {
        jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err && err instanceof TokenExpiredError) {
            result = "expired";
        }
        if (user) {
            if (user.role === 'admin') {
                result = true;
            } else {
                result = false;
            }
        }})
    } else {
        result = false;
    }
    return result;
};

// vérification utilisateur (ou admin) (pour sécuriser les entrypoints utilisateurs lambda)
async function verifyUser(req) {
    let result = "";
    if(req.cookies['access_token'] !== undefined) {
        jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err && err instanceof TokenExpiredError) {
            result = "expired";
        }
        if (user) {
            if (user.role === 'admin' || user._id === req.params.id) {
                result = true;
            } else {
                result = false;
            }
        }})
    } else {
        result = false;
    }
    return result;
};

// vérification restaurant (ou admin) (pour sécuriser les entrypoints restaurants)
async function verifyRestaurant(req) {
    let result = "";
    if(req.cookies['access_token'] !== undefined) {
        jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err && err instanceof TokenExpiredError) {
            result = "expired";
        }
        if (user) {
            if (user.role === 'restaurant' || user._id === req.params.id || user.role === 'admin') {
                result = true;
            } else {
                result = false;
            }
        }})
    } else {
        result = false;
    }
    return result;
}

// vérification livreur (ou admin) (pour sécuriser les entrypoints livreurs)
async function verifyDeliverer(req) {
    let result = "";
    if(req.cookies['access_token'] !== undefined) {
        jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err && err instanceof TokenExpiredError) {
            result = "expired";
        }
        if (user) {
            if (user.role === 'deliverer' || user._id === req.params.id || user.role === 'admin') {
                result = true;
            } else {
                result = false;
            }
        }})
    } else {
        result = false;
    }
    return result;
}

async function verifyifConnected(req) {
    let result = "";
    if(req.cookies['access_token'] !== undefined) {
        jwt.verify(req.cookies['access_token'], process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err && err instanceof TokenExpiredError) {
            result = "expired";
        }
        if (user) {
            result = true;
        } else {
            result = false;
        }
    })} else {
        result = false;
    }
    return result;
}


module.exports = { verifyUser, verifyifAdmin, verifyRestaurant, verifyDeliverer, verifyifConnected }