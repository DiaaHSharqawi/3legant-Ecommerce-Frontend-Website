import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root from "./routes/Root";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserLoginContextProvider from "./contexts/useLogin/useLogin";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import SetNewPassword from "./pages/SetNewPassword/SetNewPassword";
import UserProfile from "./pages/UserProfile/UserProfile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import UnProtectedRoutes from "./components/UnProtectedRoutes/UnProtectedRoutes";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import UserCartCountContextProvider from "./contexts/useCartCount/useCartCount";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import User from "./pages/User/User";
import UserOrders from "./pages/UserOrders/UserOrders";
import UserOrderCountContextProvider from "./contexts/useOrderCount/useOrderCount";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:productID",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/auth/login",
          element: (
            <UnProtectedRoutes>
              <Login />
            </UnProtectedRoutes>
          ),
        },
        {
          path: "/auth/register",
          element: (
            <UnProtectedRoutes>
              <Register />
            </UnProtectedRoutes>
          ),
        },
        {
          path: "/auth/forget-password",
          element: (
            <UnProtectedRoutes>
              <ForgetPassword />
            </UnProtectedRoutes>
          ),
        },
        {
          path: "/auth/verify-code",
          element: (
            <UnProtectedRoutes>
              <SetNewPassword />
            </UnProtectedRoutes>
          ),
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/createOrder",
          element: <CreateOrder />,
        },
        {
          path: "/user/profile",
          element: <UserProfile />,
        },
        {
          path: "/userOrders",
          element: <UserOrders />,
        },
      ],
    },
  ]);
  return (
    <>
      <UserLoginContextProvider>
        <UserCartCountContextProvider>
          <UserOrderCountContextProvider>
            <RouterProvider router={router} />
          </UserOrderCountContextProvider>
        </UserCartCountContextProvider>
      </UserLoginContextProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
}

export default App;
