const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const os = require('os');

const connectDB = require('./config/database');
const recipeRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

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
            auth: '/api/auth',
            documentation: 'https://github.com/your-repo/spoonsage-api'
        }
    });
});

// API Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);

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

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIP();
    console.log(`Server running on:`);
    console.log(`- Local:   http://localhost:${PORT}`);
    console.log(`- Network: http://${localIP}:${PORT}`);
});