const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.access_token || req.cookies.access_token;
    
    if (!token) {
        return res.status(401).json(`Siz ro'yxatdan o'tmagansiz yo'q`);
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json(`xato token yubordingiz`);
        }
        req.user = user;
        next();
    });
};









const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Siz avtorizatsiayadan o'tmagansiz" });
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Siz admin emassiz" });
        }
    });
};


module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
};
