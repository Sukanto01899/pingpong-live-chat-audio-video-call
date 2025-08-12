import React from 'react';
import ChatBoxHeader from './ChatBoxHeader';
import InputBox from './InputBox';
import Conversation from './Conversation';



const ChatBox = () => {
    
    return (
        <div className='w-full h-full bg-pink-300 flex flex-col relative'>
            <ChatBoxHeader />
            <Conversation />
            <InputBox/>
        </div>
    );
};

export default ChatBox;