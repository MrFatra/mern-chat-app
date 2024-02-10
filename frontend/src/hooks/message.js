import { useEffect, useState } from "react"
import useConversation from "../store/useConversation"
import { useSocketContext } from "../context/Socket"
import toast from "react-hot-toast"

export const useConversationMessages = () => {
    const [loading, setLoading] = useState(false)
    const { selectedContact, setMessages, messages } = useConversation()

    const getMessages = async () => {
        setLoading(true)
        try {
            const request = await fetch(`/api/message/${selectedContact._id}`)
            const result = await request.json()

            if (!request.ok) throw new Error(result.message)
            setMessages(result.messages)

        } catch (err) {
            console.error(err.message)
            setMessages([])
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (selectedContact) getMessages()
    }, [selectedContact])

    return { loading, messages, selectedContact }
}

export const useSendMessage = () => {
    const { selectedContact, setMessages, messages } = useConversation()

    const [loading, setLoading] = useState(false)

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            params.append("message", message)

            const request = await fetch(`/api/message/send/${selectedContact._id}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params,
            })
            const response = await request.json()

            if (!request.ok) throw new Error(response.message)
            setMessages([...messages, response.newMessage])
        } catch (err) {
            console.error(err.message)
            toast.error('Failed to send message, try again later.')
        } finally {
            setLoading(false)
        }
    }

    return { loading, sendMessage }
}

export const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            setMessages([...messages, newMessage])
        })

        return () => socket?.off('newMessage')
    }, [socket, messages, setMessages])
}