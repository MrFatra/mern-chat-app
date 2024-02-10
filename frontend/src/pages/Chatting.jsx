import React from 'react';
import { style } from '../constant/styles'
import { Conversation, Sidebar } from '../components'

const ContactList = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div style={style.card} className="grid grid-cols-2 mx-10 my-10 px-5 py-2 rounded-2xl w-3/4 h-[80vh] overflow-hidden">
        <Sidebar />
        <Conversation />
      </div>
    </div>
  );
};

export default ContactList;
