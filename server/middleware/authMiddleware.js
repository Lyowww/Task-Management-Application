const jwt = require('jsonwebtoken');
const User = require('../../database/model/user.model');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided!');
    }

    try {
        const decoded = jwt.verify(token, 'kljclsadflkdsjfklsdjfklsdjf');
        req.user = await User.findById(decoded._id).select('-password');
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = authMiddleware;
