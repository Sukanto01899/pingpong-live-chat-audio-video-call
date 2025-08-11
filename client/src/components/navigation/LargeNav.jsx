import React from 'react';
import LordIcon from '../../assets/icons/LordIcon';
import { icon, play } from '../../assets/icons/icon';
import { useDispatch, useSelector } from 'react-redux';
import { changeRoute } from '../../redux/routes/routeSlice';

const LargeNav = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    return (
        <div className='hidden w-full bg-pink-400 border-r border-pink-400 h-screen md:flex md:flex-col justify-between items-center py-6'>
            <div className='flex flex-col gap-4'>
                <div onClick={()=> dispatch(changeRoute('inbox'))} className='h-12 w-12 flex justify-center items-center cursor-pointer bg-pink-200 rounded-full'>
                    <LordIcon icon={icon.chat} play={play.click}/>
                </div>
                <div onClick={()=> dispatch(changeRoute('friends'))} className='h-12 w-12 flex justify-center items-center cursor-pointer bg-pink-200 rounded-full'>
                    <LordIcon icon={icon.friend} play={play.click}/>
                </div>
                <div className='h-12 w-12 flex justify-center items-center cursor-pointer bg-pink-200 rounded-full'>
                    <LordIcon icon={icon.groups} play={play.click}/>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='h-12 w-12 flex justify-center items-center cursor-pointe'>
                    <LordIcon icon={icon.setting} play={play.click}/>
                </div>
                <div className='h-12 w-12 rounded-full overflow-hidden bg-amber-800'>
                    <img src={user?.avatar?.url} alt="" />
                </div>
            </div>
        </div>
    );
};

export default LargeNav;