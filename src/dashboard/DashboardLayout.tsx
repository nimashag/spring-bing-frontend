import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineUser, AiOutlineRise, AiOutlineFileDone, AiOutlineTeam, AiOutlineUserSwitch, AiTwotoneFund, AiTwotoneHeart, AiOutlineForm, AiOutlineQuestion, AiOutlineShopping } from 'react-icons/ai';
import { MdProductionQuantityLimits } from 'react-icons/md';

import adminimg from '../assets/vihangaimg.jpg';
import faqimg from '../assets/faqimg12.jpg'
import managereviewimg from '../assets/managerev12.jpg'
import reviewstatsimg from '../assets/revstat12.jpg'
import financereportimg from '../assets/reportfinanceimg.jpg'
import manageorderimg from '../assets/ordermanageimg.jpg'
import manageproduct from '../assets/manage-product-vector.jpg'
import productreport from '../assets/stock-report.jpg'
import SidebarComp from './SidebarComp';

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
              <p>System Adminsitrator</p>
            </div>
          </div>
          <div className="header-right">
            <p>searchbar</p>
            <button>icon2</button>
            <button>icon1</button>
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

        <hr className="my-5" />

        {/* dewani KAAALLA */}
        <h2 className='text-xl font-bold leading-snug text-black mt-5'>Products Dashboard</h2>
          <div className='flex w-full md:flex-row  items-center gap-5'>
              {/* left side */}
              <div className='md:w-3/4'>
                <section className="dashboard-overview">

                    <div className="stat-card">
                      <h3 className='text-xl font-semibold text-black'>Manage Products</h3>
                      <img src={manageproduct} className=" h-56"/>
                      <p className='mt-2 '>Upload new products to the catalog and View items, update or remove products.</p>
                      <Link to="/admin/manage-products">
                      <button className='bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-yellow-400  transition-all duration-300'>
                      Check Products
                      </button>
                      </Link>
                    </div>

                    <div className="stat-card ">
                      <h3 className='text-xl font-semibold text-black'>Product Reports</h3>
                      <img src={productreport} />
                      <p className='mt-2'>Generate insights on stock levels and order performance, optimizing product availability and sales strategies.</p>
                      <Link to="/admin/stat-products">
                      <button className='bg-black  font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-yellow-400  transition-all duration-300'>
                      Check Reports
                      </button>
                      </Link>
                    </div>
                </section>
              </div>

            {/* Right Side */}
              <div className='md:w-1/2'>
                <section>
                        <div className="chart">
                          <h3>Mokak hari chart ekak methanata dapan - PRODCUTS SAMBANDAWA HABAI</h3>
                          <canvas id="recentMovementChart"></canvas>
                        </div>
                </section>
              </div>
          </div>

          <hr className="my-5" />

          {/* thunweni KAAALLA */}
          <div className='flex w-full md:flex-row  items-center gap-5'>
              <div>
              <h2 className='text-xl font-bold leading-snug text-black mt-5'>Reviews & FAQs dashboard</h2>
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
                      <p className='mt-2 '>Monitor and manage product reviews, including editing and deleting as needed.</p>
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
                      Check Statistics
                      </button>
                      </Link>
                    </div>

                </section>

                <hr className="my-5" />

                {/* 4weni KAAALLA */}
                <h2 className='text-xl font-bold leading-snug text-black mt-5'>Order Status Dashboard</h2>
                <section className="dashboard-overview">
                <div className="stat-card flex items-center">
                  <img src={manageorderimg} className="w-1/3" />
                  <div className="ml-5">
                    <h3 className='text-xl font-semibold text-black text-left'>Manage Orders</h3>
                    <p className='mt-2 text-left'>Easily view, track, and update customer orders, ensuring smooth order fulfillment and timely delivery.</p>
                    <button className='bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-blue-500 transition-all duration-300'>
                      Check Orders
                    </button>
                  </div>
                </div>
                <div className="stat-card flex items-center">
                  <img src={financereportimg} className="w-1/3" />
                  <div className="ml-5">
                    <h3 className='text-xl font-semibold text-black text-left'>Finance Reports</h3>
                    <p className='mt-2 text-left'>Access detailed financial summaries, including revenue, expenses, and profit trends, to help manage your business's financial health.</p>
                    <button className='bg-black font-semibold text-white mt-5 px-10 py-2 rounded hover:bg-green-300 transition-all duration-300'>
                      Check Reports
                    </button>
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
