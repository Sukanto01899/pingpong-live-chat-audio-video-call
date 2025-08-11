import React from 'react';
import { icon } from '../../assets/icons/icon';
import LordIcon from '../../assets/icons/LordIcon';

const FileInput = () => {
    return (
        <div className='bg-pink-200 rounded-full h-12 w-12 flex justify-center items-center cursor-pointer'>
            <LordIcon icon={icon.addFile} width={32} />
        </div>
    );
};

export default FileInput;