const { success } = require("zod");

const errorHandler = (err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error!";

    res.status(statusCode).json({
        success: false,
        message,
         ...(process.env.NODE_ENV === 'dev' && { stack: err.stack })
    })
}

module.exports = errorHandler;