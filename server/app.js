// app.js
const express = require('express');
const path = require('path');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const friendshipRouter = require('./routes/friendship.route');
const messageRouter = require('./routes/messages.route')
const errorHandler = require('./middleware/errorHandler');
var cookieParser = require('cookie-parser')

const app = express(); //create express server

// Middleware
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.json());
app.use(cookieParser())

app.get('/api', (req, res)=>{
    res.send('Hello')
})

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/friends', friendshipRouter);
app.use('/api/messages', messageRouter);

// Global error handler middleware
app.use(errorHandler)

module.exports = app;