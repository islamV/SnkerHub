import React, { useState, useEffect } from 'react';
import Sidebar from "../Sidebar";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams  , useNavigate} from "react-router-dom";
import { findProduct } from '../../api/fetchData';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const url = localStorage.getItem("API_URL");
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await findProduct(id);
        setProduct(data);
        setImagePreview(data.image);
      } catch (error) {
        console.error("Error fetching product data", error);
        toast.error("Failed to fetch product data");
      }
    };

    fetchProductData();
  }, [id]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({
      ...product,
      image: file,
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const formData =  {
      name: product.name ,
      description: product.description,
      price : product.price,
      image :product.image,
    quantity: product.quantity
    }

 
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post(`${url}/v1/product/${id}`, formData, config);
      
      if (response.status === 200 || response.status === 201) {
        navigate('/dashboard/products')

        toast.success("Product updated successfully.");
      } else {
        console.error(response);
        toast.error("Error updating product.");
      }
    } catch (error) {
      console.error("Error during product update", error);
      toast.error(error.response?.data?.message || "Error updating product");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="flex items-center justify-center flex-1 min-h-screen">
        <div className="w-full max-w-2xl p-8 bg-white rounded-md shadow-md">
          <h1 className="mb-5 text-2xl font-bold text-center">Update Product</h1>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2 text-gray-700">Image</label>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" id='image' onChange={handleImageChange} name="image" />
            </Button>
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2 text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product.quantity || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Update Product
          </button>
        </div>
        {imagePreview && (
          <div className="w-full max-w-xs ml-8">
            <h2 className="mb-2 text-xl font-bold">Image Preview</h2>
            <img src={imagePreview} alt="Product Preview" className="w-full rounded-md shadow-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProduct;
