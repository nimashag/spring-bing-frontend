import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logoicon from "../assets/logoicon.png";
import searchicon from "../assets/search_icon.png";
import usericon from "../assets/user_icon.png";
import carticon from "../assets/carticon.png";
import SignupForm from "../auth/Signupform";
import Loginform from "../auth/Loginform";

const Navbar: React.FC = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [signup, setSignup] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  const toggleSignup = () => {
    setSignup((prev) => !prev);
  };

  const toggleLogin = () => {
    setLogin((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src={logoicon} className="w-28" alt="Logo" />

      <ul className="hidden sm:flex gap-20 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/newarrivals" className="flex flex-col items-center gap-1">
          <p>New Arrivals</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/products" className="flex flex-col items-center gap-1">
          <p>Collections</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About Us</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contactus" className="flex flex-col items-center gap-1">
          <p>Contact Us</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        {/* <NavLink to="" className="flex flex-col items-center gap-1">
          <p>Manage Products</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/order/orders" className="flex flex-col items-center gap-1">
          <p>Manage Orders</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        
        <NavLink to="/manage-faq" className="flex flex-col items-center gap-1">
          <p>Manage FAQ</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/manage-reviews" className="flex flex-col items-center gap-1">
          <p>Manage Reviews</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/stat-review" className="flex flex-col items-center gap-1">
          <p>Stat Reviews</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink> */}

      </ul>

      <div className="flex items-center gap-6">
        <img src={searchicon} className="w-5 cursor-pointer" alt="Search" />

        <div className="group relative">
          <img src={usericon} className="w-5 cursor-pointer" alt="User" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-blue-700 rounded">
              {!isLogged ? (
                <div>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={toggleSignup}
                  >
                    Signup
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={toggleLogin}
                  >
                    Login
                  </p>
                </div>
              ) : (
                <div>
                  <Link to='profile'>
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  </Link>
                  <Link to='/order/pendingOrder'>
                  <p className="cursor-pointer hover:text-black">My Orders</p>
                  </Link>
                  <p className="cursor-pointer hover:text-black">Logout</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img src={carticon} className="w-6 min-w-6" alt="Cart" />
        </Link>
      </div>

      {signup && <SignupForm close={toggleSignup} open={toggleLogin} />}
      {login && <Loginform close={toggleLogin} />}
    </div>
  );
};

export default Navbar;
