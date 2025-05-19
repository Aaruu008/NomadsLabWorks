require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./confi/db'); // Import your db connection
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Middleware
// server.js
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'],    // Add Authorization
  credentials: true                                     // Add this for withCredentials
}));
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});
// Connect to DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => {
  console.error("Failed to connect to DB", err);
  process.exit(1);
});