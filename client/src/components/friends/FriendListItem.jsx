import React from 'react';
import { useDispatch } from 'react-redux';
import { selectChat } from '../../redux/chat/chatSlice';
import { changeRoute } from '../../redux/routes/routeSlice';

const FriendListItem = ({user}) => {
    const dispatch = useDispatch();

    const handleFriendSelect = ()=>{
        dispatch(selectChat(user))
        dispatch(changeRoute('inbox'))
    }
    return (
        <div className='flex justify-between items-center px-3 py-2'>
            <div className='flex gap-2 items-center'>
                <div className='h-10 w-10 rounded-full overflow-hidden bg-pink-500'>
                    <img src={user?.avatar?.url} alt="" />
                </div>
                <div>
                    <p className='text-md'>{user?.name}</p>
                    <span className='text-sm'>{user?.username}</span>
                </div>
            </div>

            <button onClick={handleFriendSelect} className='bg-pink-500 px-2 py-1 cursor-pointer rounded-2xl text-white font-bold'>Send GM</button>
        </div>
    );
};

export default FriendListItem;