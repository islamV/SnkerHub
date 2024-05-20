JSX

// src/UpdateOrder.jsx
import React, { useState } from 'react';
import './UpdateOrder.css';

const UpdateOrder = ({ initialOrder }) => {
  const [order, setOrder] = useState(initialOrder);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally handle the form submission, e.g., sending the updated order data to a server
    console.log('Order updated:', order);
  };

  return (
    <div className="update-order">
      <h1>Update Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input type="text" id="customerName" name="customerName" value={order.customerName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" value={order.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" value={order.cardNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv" value={order.cvv} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="monthYear">Month/Year</label>
          <input type="text" id="monthYear" name="monthYear" value={order.monthYear} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="totalPrice">Total Price</label>
          <input type="number" id="totalPrice" name="totalPrice" value={order.totalPrice} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={order.status} onChange={handleChange} required>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button type="submit">Update Order</button>
      </form>
    </div>
  );
};

export default UpdateOrder;

















CSS

/* src/UpdateOrder.css */
.update-order {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.update-order h1 {
  text-align: center;
  margin-bottom: 20px;
}

.update-order .form-group {
  margin-bottom: 15px;
}

.update-order .form-group label {
  display: block;
  margin-bottom: 5px;
}

.update-order .form-group input,
.update-order .form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.update-order button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.update-order button:hover {
  background-color: #0056b3;
}




















App.jsx

// src/App.js
import React, { useState } from 'react';
import './App.css';
import AdminDashboard from './AdminDashboard';
import UpdateProduct from './UpdateProduct';
import ProductTable from './ProductTable';
import OrderTable from './OrderTable';
import UpdateOrder from './UpdateOrder';

function App() {
  const [products, setProducts] = useState([
    {
      name: 'Sample Product 1',
      description: 'This is a sample product description.',
      price: 19.99,
      image: null,
      quantity: 10,
    },
    {
      name: 'Sample Product 2',
      description: 'This is another sample product description.',
      price: 29.99,
      image: null,
      quantity: 5,
    },
  ]);

  const [orders, setOrders] = useState([
    {
      customerName: 'John Doe',
      phone: '123-456-7890',
      cardNumber: '1234 5678 9012 3456',
      cvv: '123',
      monthYear: '12/24',
      totalPrice: 49.99,
      status: 'Pending',
    },
    {
      customerName: 'Jane Smith',
      phone: '987-654-3210',
      cardNumber: '9876 5432 1098 7654',
      cvv: '456',
      monthYear: '11/23',
      totalPrice: 79.99,
      status: 'Completed',
    },
  ]);

  return (
    <div className="App">
      <AdminDashboard />
      <UpdateProduct initialProduct={products[0]} />
      <ProductTable products={products} />
      <OrderTable orders={orders} />
      <UpdateOrder initialOrder={orders[0]} />
    </div>
  );
}

export default App;
