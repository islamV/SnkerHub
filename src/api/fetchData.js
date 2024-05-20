

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = localStorage.getItem('API_URL');
const token = localStorage.getItem("authToken");




export const findProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/v1/product/${id}`);
 
    return response.data[0]; 
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const  allProducts =  () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/all`);
        setData(response.data);
        
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return { data, loading, error };
};

export const  allOrders =  () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/v1/orders`  ,config);
        setData(response.data);
        
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return { data, loading, error };
};


export const useFetchData = (page) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/?page=${page}`);
   
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); 

  return { data, loading, error };
};
