import React from 'react';
import LordIcon from '../../assets/icons/LordIcon';
import { icon } from '../../assets/icons/icon';

const ChatListHeader = () => {
    return (
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-pink-500'>PingPong</h1>
            <div className='flex justify-center items-center cursor-pointer'>
                <LordIcon icon={icon.menu} width='32' play='loop'/>
            </div>
        </div>
    );
};

export default ChatListHeader;