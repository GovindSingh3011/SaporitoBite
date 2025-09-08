const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
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
}

module.exports = seedAdmin;