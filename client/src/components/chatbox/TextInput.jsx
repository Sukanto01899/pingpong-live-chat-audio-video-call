import React, { useEffect, useState } from "react";
import LordIcon from "../../assets/icons/LordIcon";
import { icon } from "../../assets/icons/icon";
import { sendTypingStatus } from "../../../socket/chatEvents";
import { useSelector } from "react-redux";

const TextInput = ({ setText, clickHandler, text }) => {
  const chat = useSelector(state => state.chat.user?._id);
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isTyping) {
      sendTypingStatus(chat, { typing: isTyping })
    }else{
      sendTypingStatus(chat, { typing: isTyping })
    }

    return()=>{
      sendTypingStatus(chat, { typing: false })
    }
  }, [isTyping, chat])


  return (
    <div className="flex-8/12 lg:flex-10/12 bg-pink-200 rounded-full h-full relative">
      <input
        onKeyDown={()=> !isTyping && setIsTyping(true)}
        onBlur={()=> isTyping && setIsTyping(false)}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message"
        name="inputBox"
        type="text"
        value={text}
        className="focus:outline-none text-lg w-full h-full pl-4 pr-8"
      />
      <span onClick={clickHandler} className="absolute right-0 transform top-1/2 -translate-1/2 rotate-90 flex justify-center items-center">
        <LordIcon icon={icon.arrowSolid} play="click" />
      </span>
    </div>
  );
};

export default TextInput;
