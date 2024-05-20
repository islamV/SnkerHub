import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/CartSlice';
 
const CheckoutForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    card_number: '',
    mm_yy: '',
    cvc: '',
  });

  const [errors, setErrors] = useState({});
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const url = localStorage.getItem('API_URL');
const token  = localStorage.getItem('authToken');

  useEffect(() => {
    setTotal(cart.reduce((total, item) => total + item.price * item.qty, 0));
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fname) newErrors.fname = 'First name is required';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.card_number.match(/^\d{16}$/)) newErrors.card_number = 'Card number must be 16 digits';
    if (!formData.mm_yy.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) newErrors.mm_yy = 'MM/YY must be in MM/YY format';
    if (!formData.cvc.match(/^\d{3}$/)) newErrors.cvc = 'CVC must be 3 digits';

    return newErrors;
  };
  const dispatch = useDispatch();

  const submissionData = {
    ...formData,
    details:JSON.stringify(cart),
    total_price: total,
  };
//  console.log(submissionData) ;
  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
     
        const config = {
                headers: { 
                  Accept : 'application/json' ,
                  Authorization: `Bearer ${token}`
               }  
              };
        const response = await axios.post(`${url}/v1/order/`, submissionData , config);

        if (response.status === 200 || response.status === 201) {
          dispatch(clearCart());
          // console.log(response);
        // toast.success(response.data.success);
          navigate('done');
        }else{
          console.log(response);
          
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 422) {
            const responseData = error.response.data;
            const updatedErrors = {};
            Object.keys(responseData.errors).forEach((field) => {
              updatedErrors[field] = responseData.errors[field][0];
            });
            setErrors(updatedErrors);
            console.error('Validation errors:', updatedErrors);
          } else {
            console.log(error.response.data) ;
            toast.error('Error occurred');
          
          }
        } else {
          toast.error('Error occurred ');
       
        }
      }
    }
  };

  return (
    <div className="container flex flex-col h-screen p-4 mx-auto">
      <div className="flex flex-col w-full h-full md:flex-row md:space-x-10">
        <div className="flex-grow px-8 pt-6 pb-8 bg-white rounded shadow-md checkout-form md:w-full">
          <div className="mb-4 form-section">
            <h2 className="mb-4 text-2xl font-bold">Customer Info</h2>
            <div className="md:flex md:space-x-4">
              <div className="mb-4 form-row md:w-1/2">
                <label className="block mb-2 text-sm font-bold text-gray-700">First Name:</label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                {errors.fname && <p className="text-xs italic text-red-500">{errors.fname}</p>}
              </div>
              <div className="mb-4 form-row md:w-1/2">
                <label className="block mb-2 text-sm font-bold text-gray-700">Last Name:</label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="md:flex md:space-x-4">
              <div className="mb-4 form-row md:w-1/2">
                <label className="block mb-2 text-sm font-bold text-gray-700">Your Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                {errors.phone && <p className="text-xs italic text-red-500">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="mb-4 form-section">
            <h2 className="mb-4 text-2xl font-bold">Payment Info</h2>
            <div className="mb-4 form-row">
              <label className="block mb-2 text-sm font-bold text-gray-700">Credit Card Number:</label>
              <input
                type="text"
                name="card_number"
                value={formData.card_number}
                onChange={handleInputChange}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              {errors.card_number && <p className="text-xs italic text-red-500">{errors.card_number}</p>}
            </div>
            <div className="md:flex md:space-x-4">
              <div className="mb-4 form-row md:w-1/2">
                <label className="block mb-2 text-sm font-bold text-gray-700">Month/Year:</label>
                <input
                  type="text"
                  name="mm_yy"
                  placeholder="MM/YY"
                  value={formData.mm_yy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                {errors.mm_yy && <p className="text-xs italic text-red-500">{errors.mm_yy}</p>}
              </div>
              <div className="mb-4 form-row md:w-1/2">
                <label className="block mb-2 text-sm font-bold text-gray-700">CVC:</label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                {errors.cvc && <p className="text-xs italic text-red-500">{errors.cvc}</p>}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
          >
            Complete Checkout and Pay
          </button>
        </div>

        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md cart md:w-1/3">
          <h2 className="mb-4 text-2xl font-bold">Current Cart</h2>
          <ul className="mb-4 list-disc list-inside">
            {cart.map((item, index) => (
              <li key={index} className="flex items-center mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 mr-4"
                  height="84px" width="56px"
                />
                <div>
                  {item.name} <br /> <span className="font-bold">${item.price}</span> x{item.qty}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold">CART TOTALS <span>${total}</span></p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
