const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const recipeRoutes = require('./routes/recipes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? ['https://your-frontend-domain.com'] : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to SpoonSage API',
        version: '1.0.0',
        endpoints: {
            recipes: '/api/recipes',
            documentation: 'https://github.com/your-repo/spoonsage-api'
        }
    });
});

// API Routes
app.use('/api/recipes', recipeRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error handler middleware (should be last)
app.use(errorHandler);

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server running on http://localhost:${PORT}`);
    else
        console.log("Error occurred, server can't start", error);
});