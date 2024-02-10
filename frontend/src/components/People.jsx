import React, { useEffect } from 'react'
import Avatar from './Avatar'
import useConversation from '../store/useConversation'
import { useSocketContext } from '../context/Socket'


const People = ({ contact, emote }) => {
    const { selectedContact, setSelectedContact } = useConversation()
    const { onlineUsers } = useSocketContext()
    const isOnline = onlineUsers.includes(contact._id)

    const isSelected = selectedContact?._id === contact._id

    return (
        <div className={`flex items-center rounded-tl-lg rounded-bl-lg py-2 px-3 ${isSelected ? 'bg-primary' : 'bg-slate-400 hover:bg-primary'}`} onClick={() => setSelectedContact(contact)}>
            <Avatar link={contact.profilePic} isOnline={isOnline}/>
            <div className="flex-1">
                <p className='text-white ml-5 font-semibold'>{contact.fullName}</p>
            </div>
            <p className=''>{emote}</p>
        </div>
    )
}

export default People