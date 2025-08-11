const cookie = require("cookie");
const jwt = require("jsonwebtoken")

function socketAuth(socket, next){
    try{
        const cookies = socket.handshake.headers.cookie;
         if (!cookies) return next(new Error("No cookie found"));

         const parseCookies = cookie.parse(cookies);
         const accessToken = parseCookies.accessToken;

         if(!accessToken) return next(new Error("No access token cookie"));
         const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
         socket.user = decoded.userId
         next()
    }catch(error){
        next(new Error("Authentication error"));
    }
}

module.exports = socketAuth