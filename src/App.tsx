import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from "notistack";
import Home from './pages/Home'
import About from './pages/About'
import ManageProducts from './pages/products/ManageProducts'
import CreateProduct from './pages/products/CreateProduct'
import UpdateProduct from './pages/products/UpdateProduct'
import ViewProductsList from './pages/products/ViewProductsList.tsx'
import ViewProduct from './pages/products/ViewProduct'
import AddCategory from './pages/products/AddCategory'
import AddSubCategory from './pages/products/AddSubCategory'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactUs from './pages/ContactUs.tsx'
import ViewFAQ from './pages/faq/ViewFAQ.tsx'
import CreateFAQ from './pages/faq/CreateFAQ.tsx'
import ManageFAQ from './pages/faq/ManageFAQ.tsx'
import AnswerFAQ from './pages/faq/AnswerFAQ.tsx'
import NewArrivals from './pages/NewArrivals.tsx'
import Collections from './pages/Collections.tsx'

import ProductList from './pages/productList'
import Cart from './pages/cart/Cart.tsx';
import PendingOrders from './pages/orders/PendingOrders.tsx';
import ViewOrder from './pages/orders/ViewOrder.tsx';
 
const App : React.FC = () => {
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

          {/*  Routes for Products Module */}
          <Route path='/products' element={<ViewProductsList />} />
          <Route path='/product/:id' element={<ViewProduct />} />
          <Route path='/manage-products' element={<ManageProducts />} />
          <Route path='/create-product' element={<CreateProduct />} />
          <Route path='/update-product/:id' element={<UpdateProduct />} />
          <Route path='/add-category' element={<AddCategory />} />
          <Route path='/add-subcategory' element={<AddSubCategory />} />

          {/*Routes for cart*/}
          <Route path='/cart' element={<Cart/>}/>

          {/*Routes for Orders */}
          <Route path='/order/pendingOrder' element={<PendingOrders/>}/>
          <Route path='/order/viewOrder/:id' element={<ViewOrder/>}/>

          {/*  Routes for Faq Module */}
          <Route path='/faqs' element={<ViewFAQ />} />
          <Route path='/create-faq' element={<CreateFAQ />} />
          <Route path='/manage-faq' element={<ManageFAQ />} />
          <Route path='/answer-faq/:id' element={<AnswerFAQ />} />



        </Routes>
      <Footer />

    </div>
    </SnackbarProvider>
  )
}

export default App