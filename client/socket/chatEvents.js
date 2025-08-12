import { getSocket } from "./socket";

export const sendMessage = (toUserId, msg) => {
  const socket = getSocket();
  if (!socket) return;
  socket.emit("chat:send", { to: toUserId, message: msg }, (res)=>{
    console.log(res)
  });
};

export const onMessage = (callback) => {
  const socket = getSocket();
  if (!socket) return;
  socket.on("chat:receive", callback);
};

export const onTyping = (callback) => {
  const socket = getSocket();
  if (!socket) return;
  socket.on("chat:typier", callback);
};

export const sendTypingStatus = (toUserId, typing) => {
  const socket = getSocket();
  if (!socket) return;
  socket.emit("chat:typing", {to: toUserId, ...typing});
};
