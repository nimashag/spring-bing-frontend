import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ManageProducts from './pages/products/ManageProducts'
import CreateProduct from './pages/products/CreateProduct'
import UpdateProduct from './pages/products/UpdateProduct'
import ViewProductsList from './pages/products/ViewProductsList.tsx'
import ViewProduct from './pages/products/ViewProduct'
import AddCategory from './pages/products/AddCategory'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App : React.FC = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

      <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />

          {/*  Routes for Products Module */}
          <Route path='/products' element={<ViewProductsList />} />
          <Route path='/product/:id' element={<ViewProduct />} />
          <Route path='/manage-products' element={<ManageProducts />} />
          <Route path='/create-product' element={<CreateProduct />} />
          <Route path='/update-product/:id' element={<UpdateProduct />} />
          <Route path='/add-category' element={<AddCategory />} />

        </Routes>

      <Footer />

    </div>
  )
}

export default App