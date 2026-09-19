import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Provider } from "react-redux";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Register from "./components/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import Profile from "./components/Profile.jsx";
import Orders from "./components/Orders.jsx";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import Messages from "./components/admin/Messages.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";

import { productsLoader } from "./api/productsLoader.js";
import { contactAction } from "./api/contactAction.js";
import { loginAction } from "./api/loginAction.js";
import { registerAction } from "./api/registerAction.js";
import { profileAction } from "./api/profileAction.js";
import { profileLoader } from "./api/profileLoader.js";
import { adminOrdersLoader } from "./api/adminOrdersLoader.js";
import { messagesLoader } from "./api/messagesLoader.js";
import { ordersLoader } from "./api/ordersLoader.js";
import { contactLoader } from "./api/contactLoader.js";
import store from "./store/store.js";

const stripePromise = loadStripe(
  "pk_test_51UD2uMIVnAWT3GHp3B7w1VIwwlRLmYBeKhjPvSTBAXwausRhYh78YuzR2UWdlIPsQRjTMEOyDIy4tkfNcbNcknYv00Bk6BWeVJ",
);

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route
      path="contact"
      element={<Contact />}
      action={contactAction}
      loader={contactLoader}
    />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/products/:productId" element={<ProductDetail />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route
        path="/profile"
        element={<Profile />}
        action={profileAction}
        loader={profileLoader}
        shouldRevalidate={({ actionResult }) => !actionResult.success}
      />
      <Route path="/orders" element={<Orders />} loader={ordersLoader} />
      <Route
        path="/admin/orders"
        element={<AdminOrders />}
        loader={adminOrdersLoader}
      />
      <Route
        path="/admin/messages"
        element={<Messages />}
        loader={messagesLoader}
      />
    </Route>
  </Route>,
);

const router = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <RouterProvider
          router={router}
          hydrateFallback={<p>Loading app...</p>}
        />
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable
        pauseOnHover
        theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
        transition={Bounce}
      />
    </Elements>
  </StrictMode>,
);
