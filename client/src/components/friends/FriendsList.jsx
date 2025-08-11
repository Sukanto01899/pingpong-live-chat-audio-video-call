import React, { useState } from 'react';
import FriendListItem from './FriendListItem';
import { useGetAllUsersQuery } from '../../service/user/userService';

const FriendsList = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const {data: users} = useGetAllUsersQuery({page, limit});

    return (
        <div>
            {
                users && users.map(user => <FriendListItem key={user._id} user={user}/>)
            }
        </div>
    );
};

export default FriendsList;