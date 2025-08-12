import React, { useEffect, useRef, useState } from "react";
import MessageContent from "./MessageContent";
import useSocket from "../../hooks/useSocket";
import { onMessage, onTyping } from "../../../socket/chatEvents";
import { useDispatch, useSelector } from "react-redux";
import LordIcon from "../../assets/icons/LordIcon";
import { icon } from "../../assets/icons/icon";
import { addMessage } from "../../redux/chat/chatSlice";
import useMessages from "../../hooks/useMessages";

const Conversation = () => {
  const { messages } = useSelector((state) => state.chat);
  const {  loadingRef, hasMore, isError  } = useMessages(10);
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useSocket();
  const conversationRef = useRef(null);
  const dispatch = useDispatch();

  // console.log(messages)

  useEffect(() => {
    if (!socket) return;
    onMessage((msg) => {
      dispatch(addMessage(msg))
    });

    onTyping((data) => {
      setIsTyping(data.typing);
    });

    return () => {
      socket.off("chat:receive")
      socket.off("chat:typier")
    };
  }, [socket, dispatch]);

  useEffect(() => {
    conversationRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className="w-full h-auto pb-24 overflow-auto px-4">

      {isError && <span>Here is a error!</span>}

      {
        hasMore && <div ref={loadingRef} className="flex justify-center items-center"><LordIcon icon={icon.loading} play="loop" /></div>
      }

      {messages && messages.map((msg) => <MessageContent msg={msg} />)}

      {isTyping && (
        <span className="bg-pink-400 flex justify-center h-8 w-16 items-center rounded-full">
          <LordIcon icon={icon.typing} play="loop" />
        </span>
      )}

      <div ref={conversationRef}></div>
    </div>
  );
};

export default Conversation;
