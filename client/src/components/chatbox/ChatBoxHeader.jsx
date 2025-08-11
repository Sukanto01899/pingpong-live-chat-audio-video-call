import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LordIcon from '../../assets/icons/LordIcon';
import { icon } from '../../assets/icons/icon';
import { selectChat } from '../../redux/chat/chatSlice';

const ChatBoxHeader = () => {
    const chat = useSelector(state => state.chat.user)
    const dispatch = useDispatch();

    return (
        <div className='flex justify-between items-center py-4 px-4 border-b border-pink-400 shadow-sm'>
            <div className='flex items-center gap-2'>
                <div onClick={()=> dispatch(selectChat(null))} className='md:hidden rotate-180 flex justify-center items-center  hover:bg-pink-100 h-8 w-8 rounded-full '>
                    <LordIcon icon={icon.arrowLeft} play='click' width='24'/>
                </div>
                <div className='h-10 w-10 bg-amber-600 rounded-full overflow-hidden'>
                    <img src="/" alt="" />
                </div>
                <h3 className='text-lg'>{chat?.name}</h3>
            </div>

            <div className='flex justify-center items-center'>
                <LordIcon icon={icon.menu} play='click'/>
            </div>
        </div>
    );
};

export default ChatBoxHeader;