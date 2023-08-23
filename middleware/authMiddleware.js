const jwt = require('jsonwebtoken');

module.exports.authMiddleware = (req, res, next) => {
    // get token from header
    const token = req.header('Authorization');
    // check if token exists
    if (!token) return res.status(401).json({
        error: 'Access denied'
    });
    try {
        // verify token
        const verified = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
        // add user from payload
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({
            error: 'Invalid token'
        });
    }
}