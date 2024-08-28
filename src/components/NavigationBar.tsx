import React from 'react'
import { NavLink } from 'react-router-dom'
import search_icon from '../assets/search_icon.png';
import user_icon from '../assets/user_icon.png';

const NavigationBar: React.FC = () => {
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <p>Logo Here</p>

        <ul className='hidden sm:flex gap-5 text-sm text-grey-700'>

            <NavLink to='/' className={'flex flex-col items-center gap-1'}>
                <p>Home</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-grey-700 hidden'></hr>
            </NavLink>

            <NavLink to='/' className={'flex flex-col items-center gap-1'}>
                <p>New Arrivals</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-grey-700 hidden'></hr>
            </NavLink>

            <NavLink to='/' className={'flex flex-col items-center gap-1'}>
                <p>Collection</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-grey-700 hidden'></hr>
            </NavLink>

            <NavLink to='/' className={'flex flex-col items-center gap-1'}>
                <p>About Us</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-grey-700 hidden'></hr>
            </NavLink>

            <NavLink to='/' className={'flex flex-col items-center gap-1'}>
                <p>Reviews</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-grey-700 hidden'></hr>
            </NavLink>

        </ul>

        <div className='flex items-center gap-6'>
            <img src={search_icon} className='w-5 cursor-pointer' alt="" />

            <div className='group relative'>
                <img className='w-5 cursor pointer' src={user_icon} alt="" />
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavigationBar