import { Link } from 'react-router-dom';

import adminimg from '../assets/vihangaimg.jpg';
import faqimg from '../assets/faqimg12.jpg'
import managereviewimg from '../assets/managerev12.jpg'
import reviewstatsimg from '../assets/revstat12.jpg'
import financereportimg from '../assets/reportfinanceimg.jpg'
import manageorderimg from '../assets/ordermanageimg.jpg'
import manageproduct from '../assets/managedash3.png'
import productreport from '../assets/proreportdash1.png'
import SidebarComp from './SidebarComp';
import productrend from '../assets/trendingimg1.png'

import { FaBell, FaHome, FaSearch } from 'react-icons/fa'; 

const DashboardLayout: React.FC = ({}) => {
  
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <SidebarComp />

      {/* PALAWENI KAAALLA */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <img src={adminimg} className="profile-image" alt="Admin" />
            <div className="user-info">
              <h2 className="text-xl font-bold">Nuaghty Vihanga Max</h2>
              <p>System Administrator</p>
            </div>
          </div>
          <div className="header-right flex items-center">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search..."
              className='h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300'
            />
            <div className="absolute mt-0.7 ml-4 text-gray-500">
              <FaSearch size="15px" />
            </div>

            {/*Icons */}
            <button className="notification-icon mr-4">
              <FaBell size={18} />
            </button>
            
            <button className="home-icon mr-2">
              <FaHome size={20} />
            </button>
          </div>
        </header>


        <div className="dashboard-container">
        <h2 className='text-xl font-bold leading-snug text-black'>Monthly Sales Dashboard</h2>
        <section className="dashboard-overview">
          <div className="stat-card">
            <h3>Net Sales For This Month</h3>
            <p className='text-2xl font-bold text--800'>132,324LKR</p>
          </div>

          <div className="stat-card">
            <h3>Number Of Total Sold Products</h3>
            <p className='text-2xl font-bold text-green-800'>1304</p>
          </div>
        </section>

        {/* dewani KAAALLA */}
        <h2 className='text-xl font-bold leading-snug text-black mt-6'>Products Dashboard</h2>
          <div className='flex w-full md:flex-row  items-center gap-5'>
                <section className="dashboard-overview-2">
                    <div className="stat-card">
                      <h3 className='text-xl font-semibold text-black'>Manage Products</h3>
                      <img src={manageproduct} className='mt-2'/>
                      <p className='mt-2 '>Upload new products to the catalog and View items, update or remove products.</p>
                      <Link to="/admin/manage-products">
                      <button className='bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-cyan-800  transition-all duration-300'>
                      Check Products
                      </button>
                      </Link>
                    </div>

                    <div className="stat-card ">
                      <h3 className='text-xl font-semibold text-black'>Product Reports</h3>
                      <img src={productreport} className='mt-2'/>
                      <p className='mt-2'>Generate insights on stock levels and order performance, sales strategies.</p>
                      <Link to="/admin/stat-products">
                      <button className='bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-purple-700  transition-all duration-300'>
                      Check Reports
                      </button>
                      </Link>
                    </div>

                    <div className="stat-card ">
                      <h3 className='text-xl font-semibold text-black'>Trending Products</h3>
                      <img src={productrend} className='mt-2'/>
                      <p className='mt-2'>Reports and statistics on perfomance of trending products.</p>
                      <Link to="/admin/stat-products">
                      <button className='bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-orange-700  transition-all duration-300'>
                      Trending Products
                      </button>
                      </Link>
                    </div>
                </section>
          </div>


          {/* thunweni KAAALLA */}
          <div className='flex w-full md:flex-row  items-center gap-5'>
              <div>
              <h2 className='text-xl font-bold leading-snug text-black mt-6'>Reviews & FAQs dashboard</h2>
                <section className="dashboard-overview-2">
                    <div className="stat-card">
                      <h3 className='text-xl font-semibold text-black'>Manage FAQs</h3>
                      <img src={faqimg} />
                      <p className='mt-2 '>Oversee and update frequently asked questions to ensure users have accurate information.</p>
                      <Link to="/admin/manage-faq">
                      <button className='bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-yellow-400  transition-all duration-300'>
                      Check FAQs
                      </button>
                      </Link>
                    </div>

                    <div className="stat-card">
                      <h3 className='text-xl font-semibold text-black'>Manage Reviews</h3>
                      <img src={managereviewimg} />
                      <p className='mt-2 '>Monitor and manage product reviews, including editing deleting and reporting as needed.</p>
                      <Link to="/admin/manage-reviews">
                      <button className='bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-500  transition-all duration-300'>
                      Check Reviews
                      </button>
                      </Link>
                    </div>

                    <div className="stat-card">
                      <h3 className='text-xl font-semibold text-black'>Review Statistics</h3>
                      <img src={reviewstatsimg} />
                      <p className='mt-2 '>Analyze customer feedback  with insights on ratings and averages for selected periods.</p>
                      <Link to="/admin/stat-review">
                      <button className='bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-purple-800  transition-all duration-300'>
                      Review Statistics
                      </button>
                      </Link>
                    </div>

                </section>


                {/* 4weni KAAALLA */}
                <h2 className='text-xl font-bold leading-snug text-black mt-5'>Order Status Dashboard</h2>
                <section className="dashboard-overview">
                <div className="stat-card flex items-center">
                  <img src={manageorderimg} className="w-1/3" />
                  <div className="ml-5">
                    <h3 className='text-xl font-semibold text-black text-left'>Manage Orders</h3>
                    <p className='mt-2 text-left'>Easily view, track, and update customer orders, ensuring smooth order fulfillment and timely delivery.</p>
                    <Link to="/admin/orders">
                    <button className='bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-500 transition-all duration-300'>
                      Check Orders
                    </button>
                    </Link>
                  </div>
                </div>
                <div className="stat-card flex items-center">
                  <img src={financereportimg} className="w-1/3" />
                  <div className="ml-5">
                    <h3 className='text-xl font-semibold text-black text-left'>Finance Reports</h3>
                    <p className='mt-2 text-left'>Access detailed financial summaries, including revenue, expenses, and profit trends.</p>
                    <Link to="/admin/order/FinanceReport/">  
                    <button className='bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-300 transition-all duration-300'>
                      Check Reports
                    </button>
                    </Link>
                  </div>
                </div>
                </section>

              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
