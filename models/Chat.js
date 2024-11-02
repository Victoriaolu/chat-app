// models/Chat.js
const mongoose = require('mongoose');

// Define the chat schema
const chatSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true,
    },
    messages: [{
        username: { type: String, required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create a model from the schema and export it
const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
