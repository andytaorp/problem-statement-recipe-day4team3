const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers; // Expecting Bearer <token>
  
  if (!authorization) {
    return res.status(401).json({ error: "❌ Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    
    const user = await User.findById(_id).select("_id");
    if (!user) {
      return res.status(401).json({ error: "❌ User not found" });
    }

    req.user = user; // Attach user to the request
    next();
  } catch (error) {
    console.log("❌ Authentication Error:", error.message);
    return res.status(401).json({ error: "Request not authorized" });
  }
};

module.exports = requireAuth;

