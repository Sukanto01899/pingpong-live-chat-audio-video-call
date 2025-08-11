import React from 'react';
import ChatListItem from './ChatListItem';
import { useGetMyFriendsQuery } from '../../service/user/userService';

const ChatList = () => {
    const { data: friends} = useGetMyFriendsQuery();

    // console.log(friends)
    return (
        <div className=''>

            {
                friends && friends.map(friend => <ChatListItem friend={friend} />)

            }

        </div>
    );
};

export default ChatList;