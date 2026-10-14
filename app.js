const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.urlencoded({ extended: true }));

// DB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shop')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => res.redirect('/orders'));
app.use('/orders', orderRoutes);

// 404 handler
app.use((req, res) => {
  console.log('404 - Not found:', req.method, req.url);
  res.status(404).send(`Cannot ${req.method} ${req.url}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message, err.stack);
  res.status(500).send(`Error: ${err.message}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
