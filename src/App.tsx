import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ManageProducts from './pages/products/ManageProducts'
import CreateProduct from './pages/products/CreateProduct'
import UpdateProduct from './pages/products/UpdateProduct'
import ViewProductsList from './pages/products/ViewProductsList.tsx'
import ViewProduct from './pages/products/ViewProduct'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactUs from './pages/ContactUs.tsx'
import ViewFAQ from './pages/faq/ViewFAQ.tsx'
import CreateFAQ from './pages/faq/CreateFAQ.tsx'
import ManageFAQ from './pages/faq/ManageFAQ.tsx'
import AnswerFAQ from './pages/faq/AnswerFAQ.tsx'
import NewArrivals from './pages/NewArrivals.tsx'
import Collections from './pages/Collections.tsx'

const App : React.FC = () => {
  return (
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

          {/*  Routes for Faq Module */}
          <Route path='/faqs' element={<ViewFAQ />} />
          <Route path='/create-faq' element={<CreateFAQ />} />
          <Route path='/manage-faq' element={<ManageFAQ />} />
          <Route path='/answer-faq/:id' element={<AnswerFAQ />} />



        </Routes>

      <Footer />

    </div>
  )
}

export default App