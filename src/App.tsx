import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Home from './pages/Home';
import About from './pages/About';
import ManageProducts from './pages/products/ManageProducts';
import CreateProduct from './pages/products/CreateProduct';
import UpdateProduct from './pages/products/UpdateProduct';
import ViewProductsList from './pages/products/ViewProductsList';
import ViewProduct from './pages/products/ViewProduct';
import AddCategory from './pages/products/AddCategory';
import AddSubCategory from './pages/products/AddSubCategory';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import ViewFAQ from './pages/faq/ViewFAQ';
import CreateFAQ from './pages/faq/CreateFAQ';
import ManageFAQ from './pages/faq/ManageFAQ';
import AnswerFAQ from './pages/faq/AnswerFAQ';
import NewArrivals from './pages/NewArrivals';
import Collections from './pages/Collections';
import Cart from './pages/cart/Cart';
import PendingOrders from './pages/orders/PendingOrders';
import ViewOrder from './pages/orders/ViewOrder';
import ProfilePage from './auth/ProfilePage';
import AdminCreateAccount from './auth/AdminCreateAccount';
import AdminLogin from './auth/AdminLogin';
import Dashboard from './auth/Dashboard';

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/newarrivals' element={<NewArrivals />} />
          <Route path='/collections' element={<Collections />} />

          {/* Routes for Products Module */}
          <Route path='/products' element={<ViewProductsList />} />
          <Route path='/product/:id' element={<ViewProduct />} />
          <Route path='/manage-products' element={<ManageProducts />} />
          <Route path='/create-product' element={<CreateProduct />} />
          <Route path='/update-product/:id' element={<UpdateProduct />} />
          <Route path='/add-category' element={<AddCategory />} />
          <Route path='/add-subcategory' element={<AddSubCategory />} />

          {/* Routes for Cart */}
          <Route path='/cart' element={<Cart />} />

          {/* Routes for Orders */}
          <Route path='/order/pendingOrders' element={<PendingOrders />} />
          <Route path='/order/viewOrder/:id' element={<ViewOrder />} />

          {/* Routes for FAQ Module */}
          <Route path='/faqs' element={<ViewFAQ />} />
          <Route path='/create-faq' element={<CreateFAQ />} />
          <Route path='/manage-faq' element={<ManageFAQ />} />
          <Route path='/answer-faq/:id' element={<AnswerFAQ />} />

          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/admin-create-account' element={<AdminCreateAccount />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </SnackbarProvider>
  );
};

export default App;
