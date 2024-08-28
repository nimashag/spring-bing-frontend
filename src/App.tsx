import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ManageProducts from './pages/products/ManageProducts'
import CreateProduct from './pages/products/CreateProduct'
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
            <Route path='/manage-products' element={<ManageProducts />} />
            <Route path='/create-product' element={<CreateProduct />} />

        </Routes>

      <Footer />

    </div>
  )
}

export default App