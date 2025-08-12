// app.js
const express = require('express');
const path = require('path');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const friendshipRouter = require('./routes/friendship.route');
const messageRouter = require('./routes/messages.route')
const errorHandler = require('./middleware/errorHandler');
var cookieParser = require('cookie-parser')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const notFoundHandler = require('./middleware/notFoundHandler');
const requestLogger = require('./middleware/requestLogger');
const cors = require("cors")

const app = express(); //create express server


// Trust proxy (important for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       styleSrc: [
//         "'self'", 
//         "'unsafe-inline'",
//         "https://fonts.googleapis.com"
//       ],
//       scriptSrc: [
//         "'self'",
//         "https://cdn.lordicon.com"
//       ],
//       imgSrc: [
//         "'self'", 
//         "data:", 
//         "https:",
//         "https://cdn.lordicon.com"
//       ],
//       connectSrc: [
//         "'self'", 
//         "wss:", 
//         "ws:",
//         "https://fonts.googleapis.com",
//         "https://fonts.gstatic.com",
//         "https://cdn.lordicon.com"
//       ],
//       fontSrc: [
//         "'self'",
//         "https://fonts.gstatic.com",
//         "data:"
//       ],
//       objectSrc: ["'none'"],
//       mediaSrc: ["'self'"],
//       frameSrc: ["'none'"]
//     }
//   },
//   crossOriginEmbedderPolicy: false
// }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit auth endpoints to 5 requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting
app.use('/api/', limiter);
app.use('/api/auth/', authLimiter);

// Compression middleware
app.use(compression());

// Request logging middleware (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use(requestLogger);
}

// Body parsing middleware
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      res.status(400).json({ error: 'Invalid JSON payload' });
      return;
    }
  }
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// Middleware
app.use(cookieParser())
// Serve static files (put after middleware for better performance)
app.use(express.static(path.join(__dirname, './dist'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
  etag: true,
  lastModified: true
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API status endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'PingPong API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      friends: '/api/friends',
      messages: '/api/messages'
    }
  });
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/friends', friendshipRouter);
app.use('/api/messages', messageRouter);

// Catch-all handler for client-side routing (SPA)
app.get(/(.*)/, (req, res) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  } else {
    // API route not found
    res.status(404).json({
      error: 'API endpoint not found',
      path: req.path,
      method: req.method
    });
  }
});

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);


module.exports = app;