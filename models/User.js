// models/User.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true,   // Remove whitespace from both ends
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: '', // Optional field with a default value
    },
    profilePicture: {
        type: String,
        default: '', // Optional field for storing profile picture URL
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create a model from the schema and export it
const User = mongoose.model('User', userSchema);
module.exports = User;
