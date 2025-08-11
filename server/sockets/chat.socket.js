const Message = require("../models/message.model");
const Friendship = require('../models/friendship.model')

function registerChatHandlers(io, socket){
    // Listen for message send
  socket.on("chat:send", async (data) => {
    const { to, message } = data;
    let messagesCount;
    // console.log(data.message)
    // console.log(socket.user, to)

   if(socket.user && to){
    messagesCount =await Message.getMessageCount(socket.user, to);
   }

    if(messagesCount < 1){
      await Friendship.create({requester: socket.user, recipient: to})
    }
    // Save to DB (Message model)
    const savedMsg = await Message.create({sender: socket.user, receiver: to, content: message});

    // Example: await Message.create({ from: socket.userId, to, message });
    //  console.log(savedMsg)
    // Emit to receiver if online
    io.to(socket.user).emit("chat:receive", savedMsg);
    io.to(to).emit("chat:receive", savedMsg);
  });

  socket.on("chat:typing", (data)=>{
    const {to, typing} = data;
    io.to(to).emit("chat:typier", {typing})
  })

  // Join private room for user
  socket.join(socket.user);
}

module.exports = registerChatHandlers;