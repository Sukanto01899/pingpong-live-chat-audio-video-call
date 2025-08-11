import React from 'react';
import { icon } from '../../assets/icons/icon';
import LordIcon from '../../assets/icons/LordIcon';

const FriendsHeader = () => {
    return (
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-pink-500'>Find friends</h1>
            <div className='flex justify-center items-center cursor-pointer'>
                <LordIcon icon={icon.menu} width='32' play='loop'/>
            </div>
        </div>
    );
};

export default FriendsHeader;