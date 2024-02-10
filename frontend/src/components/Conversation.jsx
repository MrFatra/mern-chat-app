import React, { useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useConversationMessages, useListenMessages, useSendMessage } from '../hooks/message'
import useConversation from '../store/useConversation'
import { extractTime } from '../utils/time'
import { useAuthContext } from '../context/Auth'
import Avatar from './Avatar'
import Loading from './Loading'
import { FaShare } from 'react-icons/fa6'

const Conversation = () => {
    const { loading, messages, selectedContact } = useConversationMessages()
    useListenMessages()
    const lastMessageRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        })
    }, [messages])


    return (
        <div className="flex flex-col overflow-auto border-l border-l-slate-400 no-scrollbar">
            <div className="">
                <p className='text-2xl font-semibold ml-3 mb-6 mt-3'>Conversation</p>
            </div>
            {
                loading
                    ?
                    <div className="">
                        <div className="flex flex-1 items-center justify-center">
                            <p>Loading Messages</p>
                            <Loading />
                        </div>
                    </div>
                    :
                    <>
                        <ContactName name={selectedContact?.fullName} />
                        <div className="flex flex-col pl-2 overflow-hidden hover:overflow-auto my-2 no-scrollbar">
                            {
                                messages.length > 0
                                    ?
                                    messages.map((message, index) => {
                                        return (
                                            <div key={index} className="" ref={lastMessageRef}>
                                                {
                                                    <Message message={message} />
                                                }
                                            </div>
                                        )
                                    })
                                    : <div className="flex h-screen items-center justify-center">
                                        <p>There's no message for now.</p>
                                    </div>
                            }
                        </div>
                        {/* //  <div className="flex-1"> */}
                        <MessageInput />
                        {/* // </div> */}
                    </>
            }
        </div >
    )
}

const ContactName = ({ name }) => {
    return (
        <div className='flex items-center bg-slate-600 rounded-tr-lg rounded-br-lg px-3 py-4'>
            <p className='font-medium'>To:</p>
            <p className='font-bold ml-3 text-lg'>{name}</p>
        </div>
    )
}

const Message = ({ message }) => {
    const { authUser } = useAuthContext()
    const { selectedContact } = useConversation()
    const time = extractTime(message.createdAt)

    const isMe = message.senderId === authUser.data._id

    return (
        <div className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <Avatar link={isMe ? authUser.data.profilePic : selectedContact.profilePic} />
            </div>
            <div className="flex items-center chat-header gap-2">
                {isMe ? authUser.data.fullName : selectedContact.fullName}
                <time className="text-xs opacity-50">{time}</time>
            </div>
            {/* <time className="text-xs opacity-50">12:46</time> */}
            <div className="chat-bubble">{message.message}</div>
            {/* <div className="chat-footer opacity-50">
                Seen at 12:46
            </div> */}
        </div>
    )
}

const MessageInput = () => {
    const { loading, sendMessage } = useSendMessage()

    const messageRef = useRef(null)

    const onSubmit = async (event) => {
        event.preventDefault()
        const message = messageRef.current?.value
        if (message !== '') await sendMessage(message)
        messageRef.current.value = ''
    }

    return (
        <form onSubmit={onSubmit} className='flex flex-1 justify-center items-end gap-2 ml-2 mb-1 '>
            <div className='flex flex-1 justify-center items-end gap-2 ml-2 mb-1 '>
                <TextareaAutosize ref={messageRef} maxRows={3} className='textarea textarea-bordered textarea-sm resize-none text-start w-full no-scrollbar' placeholder='Type a message' />
                <button className='flex items-center justify-center btn btn-primary hover:text-white text-primary hover:border-1 hover:border-primary hover:bg-primary bg-transparent mr-1'>
                    {
                        loading
                            ? <Loading />
                            :
                            <div className="flex gap-2">
                                Send
                                <FaShare />
                            </div>
                    }
                </button>
            </div>
        </form>
    )
}

export default Conversation