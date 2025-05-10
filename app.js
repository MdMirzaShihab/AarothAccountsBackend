const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Import routes
const transactionRoutes = require('./src/routes/transactionRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const paymentMethodRoutes = require('./src/routes/paymentMethodRoutes');
const reportRoutes = require('./src/routes/reportRoutes');
const todayTransactionRoutes = require('./src/routes/todayTransactionRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');

dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors()); 
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/transactions', transactionRoutes);
app.use('/categories', categoryRoutes);
app.use('/payment-methods', paymentMethodRoutes);
app.use('/reports', reportRoutes);
app.use('/today-reports', todayTransactionRoutes);
app.use('/dashboard', dashboardRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;