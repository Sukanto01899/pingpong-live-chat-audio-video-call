// const User = require("../models/user.model");

// // Store userId -> socketId mapping
// const onlineUsers = new Map();

// const socketHandler = (io) => {

//     // Socket connection
//   io.on("connection", (socket) => {
//     console.log("Connected")

//     //   Socket user online
//     socket.on("user_online", async (userId) => {
//       onlineUsers.set(userId, socket.id);
//       await User.findOneAndUpdate({ _id: userId }, { isOnline: true });

//       io.emit("status_update", { userId:userId,  isOnline: true });
//     });

//     socket.on("disconnect", async () => {
//       // Find user by socketId
//       const userId = [...onlineUsers.entries()].find(
//         ([_, sid]) => sid === socket.id
//       )?.[0];

//       if (userId) {
//         onlineUsers.delete(userId);
//         await User.findByIdAndUpdate(userId, { online: false });
//         io.emit("status_update", { userId, online: false });
//       }

//       console.log("❌ User disconnected:", socket.id);
//     });
//   });
// };

// module.exports = socketHandler;
