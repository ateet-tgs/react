import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProtectedRoute from "./components/wrappers/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Layout from "./components/layouts/Layout";
import { AuthLayout } from "./components/layouts/AuthLayout";
import ItemList from "./pages/user/ItemList";
import CartPage from "./pages/user/CartPage";
import OrderDetailPage from "./pages/user/OrderDetailPage";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
        <Route path="/" element={<AdminDashboard />}></Route>
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
        <Route path="/customer" element={<UserDashboard />} />
        <Route path="/customer/items" element={<ItemList />} />
        <Route path="/customer/cart" element={<CartPage />} />
        <Route path="/customer/order/:id" element={<OrderDetailPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
