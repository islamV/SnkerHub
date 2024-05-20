import React, { useState } from 'react';
import Sidebar from "../Sidebar";
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useParams ,useNavigate} from "react-router-dom";

const AddProduct = () => {
  const url = localStorage.getItem("API_URL");
  const token = localStorage.getItem("authToken");
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    quantity: '',
  });
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
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
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', product.image);
    formData.append('quantity', product.quantity);

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post(`${url}/v1/product/`, formData, config);
      if (response.status === 200 || response.status === 201) {
        toast.success("Product created successfully.");
        setProduct({
          name: '',
          description: '',
          price: '',
          image: null,
          quantity: '',
        });
        setImagePreview(null);
       navigate('/dashboard/products')
      } else {
        console.log(response);
        toast.error("Error creating product.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
          <h1 className="mb-5 text-2xl font-bold text-center">Add New Product</h1>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
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
              value={product.description}
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
              value={product.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2 text-gray-700">Image</label>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
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
              value={product.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Create Product
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

export default AddProduct;
