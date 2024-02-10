import React from 'react'

const Avatar = ({link, isOnline}) => {
    return (
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
            <div className="w-11 rounded-full">
                <img src={link} />
            </div>
        </div>
    )
}

export default Avatar