const jwt = require("jsonwebtoken");
const multer = require("multer");

// Multer configuration for handling file uploads
const upload = multer({ dest: "uploads/" });

// authentication checker
const authChecker = async (req, res, next) => {
  // get token
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Invalid authorization" });
  }
  const onlyToken = token.split(" ")[1];
  jwt.verify(onlyToken, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.auth = user;
    next();
  });
};

module.exports = { authChecker, upload };
