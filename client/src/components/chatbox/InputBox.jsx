import FileInput from './FileInput';
import VoiceInput from './VoiceInput';
import TextInput from './TextInput';
import AiInput from './AiInput'
import { useState } from 'react';
import { sendMessage } from '../../../socket/chatEvents';
import { useSelector } from 'react-redux';

const InputBox = ({setMessages}) => {
    const [text, setText] = useState("");
    const toUser = useSelector(state => state.chat.user?._id);

    const handleSendMsg = ()=>{
        if(!text) return;
        // setMessages(prev => [...prev, {text}])
        sendMessage(toUser, text)
        setText("")
    };


    return (
        <div className='w-full md:w-[700px] lg:w-8/12 h-12 px-2 md:px-4 lg:px-8 fixed  bottom-6  overflow-hidden flex justify-center items-center gap-2'>
           <div className='flex items-center h-full gap-2 w-12/12 md:max-w-11/12 xl:min-w-11/12'>
             <TextInput clickHandler={handleSendMsg} setText={setText} text={text}/>
            <div className='flex justify-between items-center gap-1 flex-auto'>
                <FileInput/>
                <VoiceInput/>
                <AiInput/>
            </div>
           </div>
        </div>
    );
};

export default InputBox;