const { validUserInput } = require("../utils/zodValidation");
const User = require("../models/user.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const Token = require("../models/token.model");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const register = async (req, res) => { //User register controller
  const { name, email, phone, password } = req.body;

  // User input check
  if (!name || !password || (!phone && !email)) {
    throw new ApiError(400, 'Invalid input details!')
  }

  // User handler check email or phone
  const baseHandler = email ? { email } : { phone };

  // Get zod validation result
  const validationResult = validUserInput({ name, password, ...baseHandler });

  // Get user data from database
  const user = await User.createNewUser(validationResult);
  
  // Generate access & refresh token
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token on database
  await Token.create({
    user: user._id,
    token: refreshToken,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
  });

  // Send cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "Production",
    samSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "Production",
    samSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(201).json({success: true, user});
};

const login = async (req, res) => {
  const { email, username, phone, password } = req.body;

  // User input checking
  if ((!email && !username && !phone) || !password) {
    throw new ApiError(401, "User input not found!")
  }

  // Get user handler email, username or phone
  const userHandle =
    (email && { email }) || (username && { username }) || (phone && { phone });

    // Zod validation
  const validationResult = validUserInput({ password, ...userHandle });

  // Get user from database
  const user = await User.findUserByValidPassword(
    userHandle,
    validationResult.password
  );

  // Generate access token
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await Token.create({
    user: user._id,
    token: refreshToken,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "Production",
    samSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "Production",
    samSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({success: true, user});
};

const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new ApiError(401, "Invalid request, token not found!")
  }

  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  if (!payload) {
    throw new ApiError(401, "Token not valid")
  }
  const storedToken = await Token.findOne({ user: payload.userId, token });

  if (!storedToken) {
    throw new ApiError(401, 'Invalid token, token not found!')
    // return res.status(403).json("Invalid token, token not found!");
  }

  const accessToken = generateAccessToken(payload.userId);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "Production",
    samSite: "lax",
  });

  res.status(200).json({success: true});
};

const logout = async (req, res)=>{
  const token = req.cookies.refreshToken;
  if(token){
    await Token.deleteOne({token})
    res.clearCookie('refreshToken')
  }

  res.clearCookie('accessToken');

  res.status(201).json({success: true})
}

module.exports = { register, login, refresh, logout };
