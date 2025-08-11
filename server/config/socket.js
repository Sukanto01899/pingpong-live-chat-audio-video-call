const registerCallHandlers = require("../sockets/call.socket")
const registerChatHandlers = require("../sockets/chat.socket")
const registerUserHandlers = require("../sockets/user.socket")
const socketAuth = require("../utils/socketAuth")

function initSocket(io){
    // middleware for auth
    io.use(socketAuth)

    io.on('connection', (socket)=>{
        // console.log(`✅ User connected: ${socket.user}`)

        registerChatHandlers(io, socket)
        registerUserHandlers(io, socket)
        registerCallHandlers(io, socket)

        socket.on('disconnect', ()=>{
            console.log('Disconnect')
        })
    })
}

module.exports = initSocket