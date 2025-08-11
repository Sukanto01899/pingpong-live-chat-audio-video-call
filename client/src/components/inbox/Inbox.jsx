import React from 'react';
import ChatListHeader from './ChatListHeader';
import SearchBar from './SearchBar';
import ChatList from './ChatList';

const Inbox = () => {
    return (
        <>
            <div className="md:h-2/12 flex flex-col justify-between gap-2  bg-pink-300 w-full p-3 sticky top-0 border-b border-pink-400">
                <ChatListHeader />
                <SearchBar />
            </div>
            <div className="h-11/12 md:h-10/12 overflow-auto">
                <ChatList />
            </div>
        </>
    );
};

export default Inbox;