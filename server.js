const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');  // Import the connectDB function
const authRoutes = require('./routes/auth'); // Assuming you have auth routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Static files for HTML views
app.use('/views', express.static('views'));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
