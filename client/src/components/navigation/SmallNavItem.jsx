import React from 'react';
import LordIcon from '../../assets/icons/LordIcon';
import { useDispatch } from 'react-redux';
import { changeRoute } from '../../redux/routes/routeSlice';

const SmallNavItem = ({ nav }) => {
    const dispatch = useDispatch();
    return (
        <div onClick={()=>dispatch(changeRoute(nav.path))} className='flex flex-col items-center gap-1'>
            <div className='bg-pink-200 rounded-full w-10 h-8 p-1 flex justify-center items-center'>
                <LordIcon icon={nav.icon} width='32' play='click' />
            </div>
            <span>{nav.name}</span>
        </div>
    );
};

export default SmallNavItem;