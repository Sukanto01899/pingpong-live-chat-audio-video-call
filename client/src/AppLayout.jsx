import React, { useEffect } from "react";
import LargeNav from "./components/navigation/LargeNav";
import SmallNav from "./components/navigation/SmallNav";
import ChatBox from "./components/chatbox/Chatbox";
import Inbox from "./components/inbox/Inbox";
import { useSelector } from "react-redux";
import useSocket from "./hooks/useSocket";
import Friends from "./components/friends/Friends";

const AppLayout = () => {
    const chat = useSelector(state => state.chat.user);
    const myId = useSelector(state => state.auth?.user._id);
    const route = useSelector(state => state.route.path)
    const { socket } = useSocket()

    useEffect(() => {
        if (socket) {
            socket.emit('user_online', myId);

            socket.on("status_update", (data) => {
                console.log(`User ${data.userId} is now ${data.isOnline ? "online" : "offline"}`);
            });

        }
        return () => {
            if (socket) socket.off("status_update");
        };
    }, [myId, socket])

    return (
        <main>
            <div className="flex justify-between items-center h-screen overflow-y-hidden">
                <div className="lg:3/4 xl:flex-2/4 flex w-full bg-pink-300 overflow-y-auto border-r border-pink-400">
                    {/* Menu */}
                    <div className="fixed w-full bottom-0 md:relative md:block md:flex-1/6 ">
                        <LargeNav />
                        <SmallNav />
                    </div>
                    {/* Friend list */}
                    <div className="bg-pink-200 w-full h-screen">
                        {route === 'inbox' && <> <div className={`${chat && "hidden md:block"}`}>
                            <Inbox />
                        </div>
                            <div className={`${!chat && "hidden"} w-full h-screen md:hidden`}>
                                <ChatBox />
                            </div> </>}

                        {
                            route === 'friends' && <Friends />
                        }
                    </div>
                </div>
                {/* conversation */}
                <div className="w-full h-screen bg-pink-300 hidden md:block">
                    {chat ? <ChatBox chat={chat} /> : ""}
                </div>
            </div>
        </main>
    );
};

export default AppLayout;
