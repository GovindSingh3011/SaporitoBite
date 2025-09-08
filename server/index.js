const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const os = require('os');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/database');
const recipeRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const subscribeRoutes = require('./routes/subscriber');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
        console.warn('Admin credentials not set in .env');
        return;
    }

    const existingAdmin = await User.findOne({ email, role: 'admin' });
    if (existingAdmin) {
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'admin'
    });

    console.log('Admin user seeded.');
});

// Middleware
app.use(cors({
    origin: (process.env.CORS_ORIGIN || '').split(','),
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscriber', subscribeRoutes);

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