import React from 'react';
import AnimatedText from '../motion/AnimatedText ';

const AppLoading = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="flex gap-1 justify-center text-4xl font-extrabold text-pink-500">
                <AnimatedText text="PingPong" />
            </div>
        </div>
    );
};

export default AppLoading;