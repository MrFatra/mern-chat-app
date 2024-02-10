import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useAuthContext } from "./Auth";
import { BASE_URL } from "../config";
import io from 'socket.io-client'

export const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext()

    useEffect(() => {
        if (authUser) {
            const backendSocket = io(BASE_URL, {
                query: {
                    userId: authUser.data._id
                }
            })
            setSocket(backendSocket)

            backendSocket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users)
            })

            return () => backendSocket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])
    
    return <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>
}