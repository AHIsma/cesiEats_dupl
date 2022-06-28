var mongoose = require('mongoose'); 
var bcrypt = require('bcryptjs');
var { Schema } = mongoose;

var UserSchema = new mongoose.Schema({
    firstName: {
       type: String,
       required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
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
    dob: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    street: {
        type: String,
        trim: true,
        required: true
    },
    apt: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    zipCode: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        required: false
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Orders', default: null}],
    connections: [{ type: Date }],
    lastConnectedAt: { type: Date },
    sponsorCode: { type: String, required: true },
    hasbeenSponsored: { type: Boolean, default: false },
    sponsor: { type: Schema.Types.ObjectId, ref: 'Users', default: null }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', UserSchema);