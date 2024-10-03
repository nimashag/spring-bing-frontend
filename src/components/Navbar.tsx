import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion for smooth animations
import logoicon2 from '../assets/logoimg1.png';
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
    <div className="flex items-center justify-between sm:px-10 font-medium bg-white">
      {/* Logo */}
      <motion.img
        src={logoicon2}
        className="w-24 cursor-pointer"
        alt="Logo"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      {/* Navbar Links */}
      <ul className="hidden sm:flex gap-10 md:gap-20 text-sm text-gray-700">
        {[
          { to: "/", text: "Home" },
          { to: "/newarrivals", text: "New Arrivals" },
          { to: "/products", text: "Collections" },
          { to: "/reviews", text: "Reviews" },
          { to: "/about", text: "About Us" },
          { to: "/contactus", text: "Contact Us" },
          { to: "/faqs", text: "FAQs" },
        ].map((item, index) => (
          <motion.li key={index} whileHover={{ scale: 1.1, y: -5 }}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-gray-600 hover:text-blue-500 ${
                  isActive ? "text-blue-600" : ""
                }`
              }
            >
              <p>{item.text}</p>
              <motion.hr
                className="w-2/4 border-none h-[1.5px] bg-blue-500 hidden"
                layoutId="underline"
              />
            </NavLink>
          </motion.li>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <motion.img
          src={searchicon}
          className="w-5 cursor-pointer"
          alt="Search"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />

        {/* User Dropdown */}
        <div className="relative group">
          <motion.img
            src={usericon}
            className="w-5 cursor-pointer"
            alt="User"
            whileHover={{ scale: 1.2 }}
          />
          <motion.div
            className="absolute right-0 hidden group-hover:block mt-2 bg-slate-100 rounded shadow-lg p-4 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-col gap-2 w-36 py-3 px-5">
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
                  <Link to="profile">
                    <p className="cursor-pointer hover:text-black">My Profile</p>
                  </Link>
                  <Link to="/order/pendingOrder">
                    <p className="cursor-pointer hover:text-black">My Orders</p>
                  </Link>
                  <p className="cursor-pointer hover:text-black">Logout</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <motion.img
            src={carticon}
            className="w-6 cursor-pointer"
            alt="Cart"
            whileHover={{ scale: 1.2 }}
          />
        </Link>
      </div>

      {/* Signup and Login Forms */}
      {signup && <SignupForm close={toggleSignup} open={toggleLogin} />}
      {login && <Loginform close={toggleLogin} />}
    </div>
  );
};

export default Navbar;
