const Message = require("../models/message.model");
const Friendship = require('../models/friendship.model')

function registerChatHandlers(io, socket){
    // Listen for message send
  socket.on("chat:send", async (data, callback) => {
    const { to, message } = data;
    let messagesCount;
   
    // user message count
   if(socket.user && to){
    messagesCount =await Message.getMessageCount(socket.user, to);
   }

    if(messagesCount < 1){
      await Friendship.create({requester: socket.user, recipient: to})
    }
    // Save to DB (Message model)
    const savedMsg = await Message.create({sender: socket.user, receiver: to, content: message});

    // Emit to receiver if online
    io.to(to).emit("chat:receive", savedMsg);
    callback({ status: 'ok', messageId: savedMsg._id })
  });

  socket.on("chat:typing", (data)=>{
    const {to, typing} = data;
    io.to(to).emit("chat:typier", {typing})
  })

  // Join private room for user
  socket.join(socket.user);
}

module.exports = registerChatHandlers;