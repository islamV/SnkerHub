import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, gif } from "../assets/data";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const API_URL = localStorage.getItem("API_URL") +"/v1/logout";
  const cart = useSelector((state) => state.cart);
  
  const [click, setClick] = useState(false);
  const mobile = () => {
    setClick(!click);
  };
  const token =localStorage.getItem("authToken") ;
  const handleLogout = () => {
    const config = {
      headers: { 
        Accept : 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
     } }
    const logout = async ()=>{
      const resp = await axios.post(API_URL ,[],config );
      if ( resp.status ===200) {
        toast.success(resp.data.message);
        localStorage.removeItem("authToken");
        navigate('/') ;
      }else{
        toast.error("something error");
      }

      }
    logout() ;
    // Perform any additional logout actions if needed
  };
  return (
    <div className="flex items-center justify-between w-full h-10 p-1 md:p-4">
      <div className="flex flex-row items-center gap-2">
        <img src={logo} alt="" height={50} width={50} className="dark:hidden" />
        <img
          src={gif}
          alt=""
          height={20}
          width={20}
          className="hidden dark:block"
        />
        <span className="text-2xl font-[1000] text-center dark:text-white">
          SNKR.
          <span className="text-sm font-extrabold">hub</span>
        </span>
      </div>

      <ul className="flex-col hidden gap-2 text-sm font-semibold text-black md:flex dark:text-white md:tracking-wide md:flex-row md:gap-8">
   
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        {token ? null :  ( <li>
          <Link to="/login">Login</Link>
        </li>)}
        {token ? (
          <li>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </li>
        ) : null}
        <li>
          <Link to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-xl " />
              {cart.length > 0 && (
                <span
                  className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-green-600 rounded-full -top-1 -right-2 animate-bounce"
                >
                  {cart.length}
                </span>
              )}
            </div>
          </Link>
        </li>
      </ul>
      {/* hidden max-sm:block */}
      <div className="block md:hidden">
        <button onClick={mobile}>
          {!click && <GiHamburgerMenu className="text-2xl dark:text-white" />}
          {click && <FaTimes className="text-2xl dark:text-white" />}
          <ul
            className={`text-sm ${
              click ? "block" : "hidden"
            } w-full flex flex-col gap-y-4 absolute top-10 left-0 right-0 text-black dark:text-white font-semibold z-10 backdrop-blur-sm`}
          >
            <li className="h-8 rounded-md ">
              <Link to="/">Home</Link>
            </li>
            <li className="h-8 rounded-md ">
              <Link to="/explore">Explore</Link>
            </li>
            <li className="h-8 rounded-md ">
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
