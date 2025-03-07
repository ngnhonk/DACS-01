const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization'); // Lấy token từ headers - undefined
    if (!token) return res.status(401).json({ message: 'Unauthorized' }); 

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Gán user vào request để sử dụng tiếp
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' }); // Token không hợp lệ
    }
};
// Middleware kiểm tra role
module.exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Permission denied' });
        }
        next();
    };
};
