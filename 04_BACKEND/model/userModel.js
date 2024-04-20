const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userId: { type: String, default: uuidv4 },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    roles: { type: Number, required: true },
    city: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
