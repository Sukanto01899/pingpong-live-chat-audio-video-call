import React from 'react';
import LordIcon from '../../assets/icons/LordIcon';
import { icon } from '../../assets/icons/icon';
import SmallNavItem from './SmallNavItem';

const navigation = [
    {
        name: "Chat",
        icon: icon.chatRegular,
        path: 'inbox'
    },
    {
        name: "Notification",
        icon: icon.bell,
        path: "notification"
    },
    {
        name: "Friends",
        icon: icon.friend,
        path: "friends"
    },
    {
        name: "Setting",
        icon: icon.setting,
        path: "setting"
    }
]

const SmallNav = () => {
    return (
        <div className='bg-pink-400 w-full md:hidden py-1 flex justify-between px-4'>
            {
                navigation.map(nav => (
                  <SmallNavItem key={nav.path} nav={nav}/>
                ))
            }
        </div>
    );
};

export default SmallNav;