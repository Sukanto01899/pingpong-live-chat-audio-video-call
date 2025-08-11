// server.js
const http = require('http');
const {Server} = require('socket.io');
require('dotenv').config();
const app = require('./app');
// const cors = require("cors")
const socketHandler = require('./sockets');
const connectDB = require('./config/database');
const initSocket = require('./config/socket');

const PORT = process.env.PORT || 3000;

// app.use(cors({
//   origin: true, // Vite frontend origin
//   credentials: true
// }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true
  }
}) // create socket.io server

initSocket(io)

// Database connect
connectDB()

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// "http://localhost:5173"
// methods: ["GET", "POST"],