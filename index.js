
const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const http = require('http');
const socketIo = require('socket.io');
const User = require('./models/User');
const Chat = require('./models/Chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the React app
app.use(express.static('client/build'));

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = socketIo(server);

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb+srv://vicky1:Oluchi12@cluster0.z4wra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true ,})
   .then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// User Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Error registering user' });
    }
});

// Start the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
