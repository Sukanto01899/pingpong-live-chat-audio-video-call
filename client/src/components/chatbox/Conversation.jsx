import React, { useEffect, useRef, useState } from "react";
import MessageContent from "./MessageContent";
import { useGetMessagesQuery } from "../../service/message/messageService";
import useSocket from "../../hooks/useSocket";
import { onMessage, onTyping } from "../../../socket/chatEvents";
import { useSelector } from "react-redux";
import LordIcon from "../../assets/icons/LordIcon";
import { icon } from "../../assets/icons/icon";

const Conversation = ({ setMessages, messages }) => {
  const chat = useSelector((state) => state.chat.user?._id);
  const { data, isSuccess } = useGetMessagesQuery(chat);
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useSocket();
  const conversationRef = useRef(null);

  useEffect(() => {
    if (socket) {
      onMessage((msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      onTyping((data) => {
        setIsTyping(data.typing);
      });
    }

    return () => {
      if (socket) socket.off("chat:receive");
    };
  }, [socket, setMessages]);

  useEffect(() => {
    if (isSuccess && data) {
      setMessages([...data]);
    }
  }, [data, isSuccess, setMessages]);

   useEffect(() => {
    conversationRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 
  return (
    <div className="w-full h-auto pb-24 overflow-auto px-4">
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
