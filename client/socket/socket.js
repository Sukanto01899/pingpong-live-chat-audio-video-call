import io from 'socket.io-client';

let socket = null

export const connectSocket = ()=>{
    // "http://localhost:3000", 
    socket = io({
        withCredentials: true
    })

    return socket;
}

export const getSocket = ()=> socket;

export const disconnectSocket = ()=>{
    if(socket){
        socket.disconnect();
        socket = null
    }
}