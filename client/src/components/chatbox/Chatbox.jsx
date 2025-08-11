import React, { useState } from 'react';
import ChatBoxHeader from './ChatBoxHeader';
import InputBox from './InputBox';
import Conversation from './Conversation';



const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    
    return (
        <div className='w-full h-full bg-pink-300 flex flex-col relative'>
            <ChatBoxHeader />
            <Conversation messages={messages} setMessages={setMessages} />
            <InputBox setMessages={setMessages} />
        </div>
    );
};

export default ChatBox;