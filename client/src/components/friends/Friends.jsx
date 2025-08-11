import React from 'react';
import ChatListHeader from '../inbox/ChatListHeader';
import SearchBar from '../inbox/SearchBar';
import FriendsHeader from './FriendsHeader';
import FriendsList from './FriendsList';

const Friends = () => {
    return (
        <>
            <div className="md:h-2/12 flex flex-col justify-between gap-2  bg-pink-300 w-full p-3 sticky top-0 border-b border-pink-400">
                <FriendsHeader/>
                <SearchBar />
            </div>
            <div className="h-11/12 md:h-10/12 overflow-auto">
               <FriendsList/>
            </div>
        </>
    );
};

export default Friends;