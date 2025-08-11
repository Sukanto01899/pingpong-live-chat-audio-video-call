const jwt = require("jsonwebtoken");

const generateAccessToken = (userId)=>{
    return jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'} )
}

const generateRefreshToken = (userId)=>{
    return jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"})
}

module.exports = {generateAccessToken, generateRefreshToken}