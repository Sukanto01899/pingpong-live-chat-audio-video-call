const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

const authenticate =async (req, res, next) => {
  const cookieToken = req.cookies.accessToken;

  if (!cookieToken) {
    throw new ApiError(403, "Unauthorized request!");
  }

  try {
    const decoded = jwt.verify(cookieToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({_id: decoded.userId}).select("-password");
    if(!user) throw new ApiError(403, "User not found!");
    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    if(error.name === "TokenExpiredError"){
        throw new ApiError(401, "Token expired! login again.")
    }
    throw new ApiError(403, error.name)
  }
};

module.exports = authenticate;
