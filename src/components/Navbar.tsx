import React from 'react'
import logoicon from '../assets/logoicon.png'
import { Link, NavLink } from 'react-router-dom'

import searchicon from '../assets/search_icon.png'
import usericon from '../assets/user_icon.png'
import carticon from '../assets/carticon.png'

const Navbar: React.FC = () => {
  return (
    <div className='flex items-center justify-between py-5 font-medium'>

        <img src={logoicon} className='w-28' alt="" />

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700' >
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>Home</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>New Arrivals</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>Collections</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>About Us</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>Contact Us</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            {/* TODO: Temporary links for testing. Please remove later */}
            <NavLink to='/products' className='flex flex-col items-center gap-1'>
                <p>Products</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to='/manage-products' className='flex flex-col items-center gap-1'>
                <p>Manage Products</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to='/create-product' className='flex flex-col items-center gap-1'>
                <p>Create Product</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

        </ul>

        <div className='flex items-center gap-6'>
            <img src={searchicon}  className='w-5 cursor-pointer' alt=""/>

            <div className='group relative'>
                <img src={usericon} className='w-5 cursor-pointer' alt="" />
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-blue-700 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>   
                        <p className='cursor-pointer hover:text-black'>My Orders</p> 
                        <p className='cursor-pointer hover:text-black'>Logout</p> 
                    </div>
                </div>
            </div>

            <Link to='/cart' className='relative'>
                <img src={carticon} className='w-6 min-w-6' alt="" />
                <p></p>
            </Link>

        </div>
    </div>
  )
}

export default Navbar