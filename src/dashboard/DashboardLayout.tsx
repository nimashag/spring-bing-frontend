import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineUser, AiOutlineRise, AiOutlineFileDone, AiOutlineTeam, AiOutlineUserSwitch, AiTwotoneFund, AiTwotoneHeart, AiOutlineForm, AiOutlineQuestion, AiOutlineShopping} from 'react-icons/ai';
import { MdProductionQuantityLimits } from 'react-icons/md';

import adminimg from '../assets/vihangaimg.jpg'
import addproductimg from '../assets/addproductimg.jpg'
import manageimg from '../assets/manageimg.jpg'
import productstatsimg from '../assets/statisticsimg.jpg'

import managereviewimg from '../assets/managereviewimg12.jpg'
import reviewstatimg from '../assets/reviewstatimg12.jpg'
import faqimg from '../assets/faqimg12.jpg'

const DashboardLayout: React.FC = ({}) => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Admin Dashboard</h2>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="">
                <AiFillHome /> Dashboard
              </Link>
            </li>
            <hr/>
            <li>
              <Link to="">
                <AiOutlineForm /> Add Products
              </Link>
            </li>
            <li>
              <Link to="">
                <MdProductionQuantityLimits /> Manage Products
              </Link>
            </li>
            <li>
              <Link to="">
                <AiOutlineRise /> Trending Products
              </Link>
            </li>
            <li>
              <Link to="">
                <AiTwotoneFund /> Product Statistics
              </Link>
            </li>
            <hr/>
            <li>
              <Link to="">
                <AiOutlineShopping /> Manage Orders
              </Link>
            </li>
            <li>
              <Link to="">
                <AiOutlineFileDone /> Finance Report
              </Link>
            </li>
            <hr/>
            <li>
              <Link to="/admin/manage-reviews">
                <AiTwotoneHeart /> Manage Reviews
              </Link>
            </li>
            <li>
              <Link to="/admin/stat-review">
                <AiTwotoneFund /> Reviews Statistics
              </Link>
            </li>
            <hr/>
            <li>
              <Link to="/admin/manage-faq">
                <AiOutlineQuestion /> Manage FAQs
              </Link>
            </li>
            <hr/>
            <li>
              <Link to="">
                <AiOutlineTeam  /> Manage User Profiles
              </Link>
            </li>
            <li>
              <Link to="">
                <AiOutlineUserSwitch /> Manage Admin Profiles
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

      
      <main className="main-content">
        
        <header className="header">
          <div className="header-left">
            <img src={adminimg} className="profile-image" />
            <div className="user-info">
                {/* Methana hari ewa dapan */}
              <h2 className='text-xl text-bold'>Naughty Vihanga Max</h2>
              <p>System Administrator</p>
            </div>
          </div>
          <div className="header-right">
            <p className="date">27 Feb</p>
            <input type="text" className="search" placeholder="Search" />
            <button className="notification-button">
              <span className="notification-dot"></span>
            </button>
            <button className="message-button"></button>
          </div>
        </header>

        
        <div className="content-area">

            
            <section className="analytics">

                <div className="product-section">
                    <img src={addproductimg} alt="Add Products" className="product-image" />
                    <div className="content">
                        <h3>Add Products</h3>
                        <p>Add new arrivals and stock products</p>
                        <button className="navigate-button">Add Products</button>
                    </div>
                </div>

                <div className="product-section">
                    <img src={manageimg} alt="Add Products" className="product-image" />
                    <div className="content">
                        <h3>Manage Products</h3>
                        <p>Manage product stocks and keep track of the products</p>
                        <button className="navigate-button">Manage Products</button>
                    </div>
                </div>

                <div className="product-section">
                    <img src={productstatsimg} alt="Add Products" className="product-image" />
                    <div className="content">
                        <h3>Statistics</h3>
                        <p>Check product statistics to see current best sellers and others</p>
                        <button className="navigate-button">Check Statistics</button>
                    </div>
                </div>
            </section>
            
            {/* Add orders section */}
            <section className="analytics">
                <div className="product-section">
                    <div className="content">
                        <h3>Manage Orders</h3>
                        <p>Manage user purchases and user current orders here!</p>
                        <button className="navigate-button">Check Orders</button>
                    </div>
                </div>

                <div className="product-section">
                    <div className="content">
                        <h3>Financial Reports</h3>
                        <p>Generate financial reports based on user purchases!</p>
                        <button className="navigate-button">Check Reports</button>
                    </div>
                </div>
            </section>


            {/* Add reviews section */}
            <section className="analytics">
            <div className="product-section">
            <img src={managereviewimg} alt="Add Products" className="product-image" />
                    <div className="content">
                        <h3>Manage Reviews</h3>
                        <p>Manage and approve user submitted reviews</p>
                        <button className="navigate-button">User Reivews</button>
                    </div>
                </div>

                <div className="product-section">
                <img src={reviewstatimg} alt="Add Products" className="product-image" />
                    <div className="content">
                        <h3>Review Statistics</h3>
                        <p>Generate reports based user submitted reviews on our products</p>
                        <button className="navigate-button">Check Statistics</button>
                    </div>
                </div>

                <div className="product-section">
                <img src={faqimg} alt="Add Products" className="product-image" />
                    <div className="content">
                        <h3>Manage FAQs</h3>
                        <p>Manage user frequently asked questions here and answer them!</p>
                        <button className="navigate-button">Manage FAQs</button>
                    </div>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
