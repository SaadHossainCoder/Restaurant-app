/* eslint-disable react/prop-types */
//react-router-dom
import {
  BrowserRouter, Navigate, Route,
  Routes,
} from 'react-router-dom'
//react-components
import Successful from './pages/Successful'
import Payment from './pages/Payment'
import Mycart from './pages/Mycart'
import Home from './pages/Home'
import OrderInfo from './pages/OrderDetails'
import Search from './pages/Search'
import Admin_Home from './admin/pages_admin/Admin_Home'
import Admin_Login from './admin/pages_admin/Admin_Login'
//react-error-component
import { RouteErrorBoundary } from './components/error/ErrorPage'
import { useSelector } from 'react-redux'

import useLoadData from './admin/hooks/userLoadData'
import FullPageLoader from './admin/ui/FullPageLoader'


// Protected Routes
function ProtectedRoutes({ children }) {
  const { isLoggedIn } = useSelector((state) => state.user);
  const isLoading = useLoadData(); // <-- Only called here now

  if (isLoading) return <FullPageLoader />;
  return isLoggedIn ? children : <Navigate to="/login" />;
}

// Layout component that handles header visibility
function Layout() {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orderinfo/:id" element={<OrderInfo />} errorElement={<RouteErrorBoundary />} />
        <Route path="/mycart" element={<Mycart />} errorElement={<RouteErrorBoundary />} />
        <Route path="/successful" element={<Successful />} errorElement={<RouteErrorBoundary />} />
        <Route path="/payment" element={<Payment />} errorElement={<RouteErrorBoundary />} />
        <Route path="/search" element={<Search />} errorElement={<RouteErrorBoundary />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Admin_Login />} errorElement={<RouteErrorBoundary />} />

        {/* ✅ Only /dashboard is protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Admin_Home />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
