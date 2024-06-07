// backend/server.js
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const URI='mongodb://127.0.0.1:27017/rgukt-bms';
mongoose.connect(URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Connection error', error.message);
});


app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});
