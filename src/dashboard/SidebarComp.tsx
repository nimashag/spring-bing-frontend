import React from 'react'
import { AiOutlineBank, AiFillHome,AiOutlineFileSearch,  AiOutlineLineChart, AiOutlineDollar, AiOutlineUser, AiOutlineIdcard, AiOutlineRise, AiOutlineFileDone, AiOutlineTeam, AiOutlineUserSwitch, AiTwotoneFund, AiTwotoneHeart,  AiOutlineQuestion, AiOutlineShopping } from 'react-icons/ai';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '../dashboard/DashboardLayout.css';


const SidebarComp :React.FC= () => {
  return (
    <div>
        {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Admin Dashboard</h2>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/admin/dash">
                <AiFillHome /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/">
              <AiOutlineBank /> Web Home
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/manage-products">
                <MdProductionQuantityLimits /> Manage Products
              </Link>
            </li>
            <li>
              <Link to="/admin/TT">
                <AiOutlineRise /> Trending Products
              </Link>
            </li>
            <li>
              <Link to="/admin/stat-products">
              <AiOutlineLineChart /> Product Statistics
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/sf">
              <AiOutlineFileSearch /> Sales Forecasting
              </Link>
            </li>
            <li>
              <Link to="/admin/dp">
              <AiOutlineDollar /> Dynamic Pricing
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/orders">
                <AiOutlineShopping /> Manage Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/order/FinanceReport/">
                <AiOutlineFileDone /> Finance Report
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/manage-reviews">
                <AiTwotoneHeart /> Manage Reviews
              </Link>
            </li>
            <li>
              <Link to="/admin/stat-review">
                <AiTwotoneFund /> Review Statistics
              </Link>
            </li>
            <li>
              <Link to="/admin/summary-review">
              <AiOutlineIdcard /> Review Summary
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/manage-faq">
                <AiOutlineQuestion /> Manage FAQs
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/admin/ud">
                <AiOutlineTeam /> Manage User Profiles
              </Link>
            </li>
            <li>
              <Link to="">
                <AiOutlineUserSwitch /> Admin Profiles
              </Link>
            </li>
            <hr />
            <li>
              <Link to="">
                <AiOutlineUser /> Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}

export default SidebarComp