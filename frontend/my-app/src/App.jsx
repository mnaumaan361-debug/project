import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Registration from "./Pages/Registration.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import { userDataContext } from "./context/UserContext.jsx";
import Nav from "./components/Nav.jsx";
import About from "./Pages/About.jsx";
import Collections from "./Pages/Collections.jsx";
import Product from "./Pages/Product.jsx";
import Contact from "./Pages/Contact.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Cart from "./Pages/Cart.jsx";
import PlaceOrder from "./Pages/PlaceOrder.jsx";
import Order from "./Pages/Order.jsx";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const location = useLocation();
  const { userData } = useContext(userDataContext);

  return (
    <>
    <ToastContainer/>
      {userData && <Nav />}

      <Routes>
        <Route
          path="/login"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Login />
            )
          }
        />

        <Route 
        path="/productdetails/:productId"
        element={
            userData ? (
              <ProductDetails/>
             
            ) : (  <Navigate to={location.state?.from || "/"} />

            )
          }/>

        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />

        <Route
          path="/"
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />              
            )
          }
        />

        

        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />

        <Route
          path="/collection"
          element={
            userData ? (
              <Collections />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />

        <Route
          path="/product"
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />

        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
            )
          }
        />
        
        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
              
              
            )
          }
        />
        
        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
              
              
            )
          }
        />


        
        <Route
          path="/order"
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
              />
              
              
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;