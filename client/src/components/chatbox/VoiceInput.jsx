import React, { useRef, useState } from 'react';
import { icon } from '../../assets/icons/icon';
import LordIcon from '../../assets/icons/LordIcon';

const VoiceInput = () => {
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                // socket.emit("voice:chunk", event.data); // Send chunk to server
            }
        };

        mediaRecorder.start(500); // send every 500ms
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };


    return (
        <div className='bg-pink-200 rounded-full h-12 w-12 flex justify-center items-center cursor-pointer'>
            <LordIcon icon={icon.microphone} width={32} />
        </div>
    );
};

export default VoiceInput;