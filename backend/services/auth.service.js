const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Missing JWT_SECRET in environment variables");
    }
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );
};

module.exports.register = async (username, email, password, role = 'user') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await db('users').insert({ username, email, password_hash: hashedPassword, role });
    return generateToken({ id: userId, email, role });
};

module.exports.login = async (email, password) => {
    const user = await db('users').where({ email }).first();
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        throw new Error('Invalid email or password');
    }
    return generateToken(user);
};
