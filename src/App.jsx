import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart, Explore, Home, Preview ,Login ,Register } from "./pages/index";

const App = () => {
  const localStorage = window.localStorage;
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

        <Route path="/preview/:id" element={<Preview />} />
      </Routes>
    </div>
  );
};

export default App;
