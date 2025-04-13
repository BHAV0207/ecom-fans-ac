const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
require('./config/passport');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// DB connection
connectDB();


app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRider'));


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
