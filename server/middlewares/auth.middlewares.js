const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization'); 
    if (!token) return res.status(401).json({ message: 'Unauthorized' }); 

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' }); 
    }
};

module.exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Permission denied' });
        }
        next();
    };
};
