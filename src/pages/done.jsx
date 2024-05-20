// src/ThankYouPage.js
import React, { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
     navigate('/login') ;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  }, []);
 
 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <svg className="mx-auto text-green-500 h-30 w-30 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 text-center bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-500">Thank You!</h1>
        <p className="mt-4 text-gray-600">Your order has been placed successfully.</p>
        <div className="mt-6">
          <svg
            className="w-24 h-24 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <button
          className="px-4 py-2 mt-8 font-semibold text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
          onClick={() => window.location.href = '/explore'}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default ThankYouPage;
