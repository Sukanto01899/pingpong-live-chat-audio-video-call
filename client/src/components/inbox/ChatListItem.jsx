import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../../redux/chat/chatSlice";

const ChatListItem = ({ friend }) => {
    const dispatch = useDispatch();
    const myId = useSelector((state) => state.auth?.user._id);
    const [friendData, setFriendData] = useState(null)

    const handleSelectChat = () => {
        dispatch(selectChat(friendData));
    };

    useEffect(() => {
        console.log(friend.requester)
        if (friend.requester?._id === myId) {
            setFriendData(friend.recipient)
        } else {
            setFriendData(friend.requester)
        }
    }, [friend, myId])

    return (
        <div
            onClick={handleSelectChat}
            className="h-18 bg-pink-200 hover:bg-pink-300 border-b border-pink-300 flex justify-between items-center px-4"
        >
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-amber-400 rounded-full overflow-hidden">
                    <img src={friendData?.avatar?.url} alt="" className="w-full h-full" />
                </div>
                <div>
                    <p>{friendData?.name}</p>
                    <p>message</p>
                </div>
            </div>

            <div>yesterday</div>
        </div>
    );
};

export default ChatListItem;
