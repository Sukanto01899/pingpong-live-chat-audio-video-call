import React from 'react';
import { useSelector } from 'react-redux';

const MessageContent = ({ msg }) => {
    const myId = useSelector(state => state.auth?.user._id);
    const chat = useSelector(state => state.chat.user)

    return (
        <div className={`flex items-end mb-2 gap-2 ${myId === msg?.sender ? "flex-row-reverse" : ""}`}>
            {myId === msg?.receiver &&<div> <div className='w-8 h-8 rounded-full overflow-hidden bg-pink-500 '>
                <img src={chat?.avatar?.url || "/"} alt="" className='h-full w-full' />
            </div>
            <span className='text-sm'>{chat?.name}</span>
             </div>}
            <div className='flex flex-col bg-pink-400 py-1 px-2 rounded-full'>
                {
                    msg.media?.url && <div className='max-h-[500px] max-w-[400px] bg-pink-500'>
                        <img src="/test.jpg" alt="photo" />
                    </div>
                }
                <p>{msg?.content}</p>
            </div>

        </div>
    );
};

export default MessageContent;