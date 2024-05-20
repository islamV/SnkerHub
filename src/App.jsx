import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart, Explore, Home, Preview ,Login ,Register, CheckoutForm } from "./pages/index";
import ThankYouPage from "./pages/done";
import Dashboard from "./dashboard/dashboard";
import ProductTable from "./dashboard/pages/products";
import OrderTable from "./dashboard/pages/orders";
import AddProduct from "./dashboard/pages/AddProducts";
import UpdateProduct from "./dashboard/pages/UpdateProducts";


const App = () => {
       const [islogined,setLogin] =  useState(false);
      useEffect( () => {

    
              const check = ()=>{
                  if(localStorage.getItem('authToken')){
                    setLogin(true) ;
                  }
              } 
              check() ;
            },[islogined])
  localStorage.setItem('API_URL' ,'https://generalapi.test/api') ;

  return (
    <div className="bg-gray-50 dark:bg-[#121212] h-full overflow-y-hidden">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
 <Route path="/Checkout" element={<CheckoutForm/>}/>
 <Route path="/checkout/done" element={<ThankYouPage/>} />


        <Route path="/preview/:id" element={<Preview />} />
        
        <Route path="dashboard/products" element={<ProductTable  />} />
        <Route path="dashboard/orders" element={<OrderTable  />} />
        <Route path="dashboard/addproduct" element={<AddProduct  />} />
        <Route path="dashboard/update/:id" element={<UpdateProduct  />} />
      </Routes>
      
    </div>
    
  );
};

export default App;
