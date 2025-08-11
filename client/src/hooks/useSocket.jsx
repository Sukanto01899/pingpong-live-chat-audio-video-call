import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { connectSocket } from '../../socket/socket';
import { useEffect } from 'react';
import { useRefreshTokenMutation } from '../service/auth/authService';

const useSocket = () => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [refreshToken] = useRefreshTokenMutation()

    const initSocket = useCallback(function () {

        try {
            const newSocket = connectSocket();

            newSocket.on('connect', () => {
                setIsConnected(true)
                console.log('Socket connected')
            })

            newSocket.on('connect_error', async (err) => {
                console.log('socket connection error', err.message)
                if (err.message === 'Authentication error') {
                    const res = await refreshToken();
                    console.log("refresh",{res})
                    if (res.success) {
                        const refreshSocket = connectSocket();
                        setSocket(refreshSocket)
                    }
                }
            })

            newSocket.on("disconnect", () => {
                setIsConnected(false);
                console.log("🔌 Socket disconnected");
            });

            setSocket(newSocket)
        } catch (error) {
            console.error("Socket init failed:", error);
        }
    }, [refreshToken])

    useEffect(() => {
        initSocket()
    }, [initSocket])

    return { socket, isConnected }

};

export default useSocket;