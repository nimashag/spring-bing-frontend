import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Home from "./pages/Home";
import About from "./pages/About";
import ManageProducts from "./pages/products/ManageProducts";
import CreateProduct from "./pages/products/CreateProduct";
import UpdateProduct from "./pages/products/UpdateProduct";
import ViewProductsList from "./pages/products/ViewProductsList";
import ViewProduct from "./pages/products/ViewProduct";
import AddCategory from "./pages/products/AddCategory";
import AddSubCategory from "./pages/products/AddSubCategory";
import StatOrders from "./pages/products/StatOrders.tsx";
import StatProducts from "./pages/products/StatProducts.tsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import ViewFAQ from "./pages/faq/ViewFAQ";
import CreateFAQ from "./pages/faq/CreateFAQ";
import ManageFAQ from "./pages/faq/ManageFAQ";
import AnswerFAQ from "./pages/faq/AnswerFAQ";
import NewArrivals from "./pages/NewArrivals";
import Collections from "./pages/Collections";
import Cart from "./pages/cart/Cart";
import PendingOrders from "./pages/orders/PendingOrders";
import ViewOrder from "./pages/orders/ViewOrder";
import ProfilePage from "./auth/ProfilePage";
import AdminCreateAccount from "./auth/AdminCreateAccount";
import AdminLogin from "./auth/AdminLogin";
import AdminDashboard from "./auth/Dashboard";
//import ProductList from './pages/productList'
import UpdateOrder from "./pages/orders/UpdateOrder";
import ViewReview from "./pages/reviews/ViewReview";
import CreateReview from "./pages/reviews/CreateReview";
import ManageReviews from "./pages/reviews/ManageReviews";
import EditReview from "./pages/reviews/EditReview";
import StatReviews from "./pages/reviews/StatReviews";
import FinanceReport from "./components/charts/orderCharts/FinanceReport.tsx";
import DashboardLayout from "./dashboard/DashboardLayout.tsx";
import OrderHistory from "./pages/orders/OrderHistory.tsx";
import Orders from "./pages/orders/Orders.tsx";
import SummaryReviews from "./pages/reviews/SummaryReviews.tsx";

const App: React.FC = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <SnackbarProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

      {!isAdminRoute && <Navbar />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/newarrivals" element={<NewArrivals />} />
          <Route path="/collections" element={<Collections />} />

          {/* Routes for Products Module */}
          <Route path="/products" element={<ViewProductsList />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="/admin/manage-products" element={<ManageProducts />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/update-product/:id" element={<UpdateProduct />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/add-subcategory" element={<AddSubCategory />} />
          <Route path="/admin/stat-orders" element={<StatOrders />} />
          <Route path="/admin/stat-products" element={<StatProducts />} />

          {/* Routes for Cart */}
          <Route path="/cart" element={<Cart />} />

          {/*Routes for Orders */}

          {/* pagination included here */}
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/order/pendingOrder" element={<PendingOrders />} />
          <Route path="/order/orderHistory" element={<OrderHistory />} />
          <Route path="/order/viewOrder/:id" element={<ViewOrder />} />
          <Route path="/order/updateOrder/:id" element={<UpdateOrder />} />
          <Route path="/admin/order/FinanceReport/" element={<FinanceReport />} />

          {/* Routes for FAQ Module */}
          <Route path="/faqs" element={<ViewFAQ />} />
          <Route path="/create-faq" element={<CreateFAQ />} />
          <Route path="/admin/manage-faq" element={<ManageFAQ />} />
          <Route path="/admin/answer-faq/:id" element={<AnswerFAQ />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/admin-create-account"
            element={<AdminCreateAccount />}
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Routes for Reviews Module */}
          <Route path="/reviews" element={<ViewReview />} />
          <Route path="/create-review" element={<CreateReview />} />
          <Route path="/admin/manage-reviews" element={<ManageReviews />} />
          <Route path="/admin/edit-review/:id" element={<EditReview />} />
          <Route path="/admin/stat-review" element={<StatReviews />} />
          <Route path="admin/summary-review" element={<SummaryReviews />} />

          {/* Admin Routes */}
          <Route path='/admin/dash' element={<DashboardLayout />} />

        </Routes>
        
        {!isAdminRoute && <Footer />}

      </div>
    </SnackbarProvider>
  );
};

export default App;
