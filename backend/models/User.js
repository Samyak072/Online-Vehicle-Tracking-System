// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures that usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures that emails are unique
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // User roles: user or admin
        default: 'user', // Default role is user
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash if password is new or modified
    this.password = await bcrypt.hash(this.password, 10); // Hash password with 10 rounds of salting
    next();
});

// Method to compare entered password with stored password
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

