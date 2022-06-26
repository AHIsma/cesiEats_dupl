var mongoose = require('mongoose'); 
var bcrypt = require('bcryptjs');
var { Schema } = mongoose;

var UserSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Orders', default: null}],
    connections: [{ type: Date }],
    lastConnectedAt: { type: Date }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', UserSchema);