// routes/messages.js
const express = require('express');
const router = express.Router();

// Define message routes here
router.get('/', (req, res) => {
    res.send('Messages route');
});

module.exports = router;
