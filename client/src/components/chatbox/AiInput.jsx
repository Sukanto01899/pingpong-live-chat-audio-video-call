import React from 'react';
import LordIcon from '../../assets/icons/LordIcon';
import { icon } from '../../assets/icons/icon';

const AiInput = () => {
    return (
        <div className='bg-pink-200 rounded-full h-12 w-12 flex justify-center items-center cursor-pointer'>
            <LordIcon icon={icon.magic} width={32} />
        </div>
    );
};

export default AiInput;