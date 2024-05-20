import React, { useState } from 'react';
import './Checkout.css';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    creditCardNumber: '',
    monthYear: '',
    cvc: '',
    billingAddressSame: true,
    billingName: '',
    billingAddress: '',
    billingCity: '',
  });

  const [cart] = useState([
    
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Customer Info</h2>
          <div className="two-column">
            <div className="form-row">
              <label>First Name:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <label>Last Name:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </div>
          </div>
          <div className="two-column">
            <div className="form-row">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <label>Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
          </div>
          <div className="two-column">
            <div className="form-row">
              <label>City:</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Payment Info</h2>
          <div className="form-row">
            <label>Credit Card Number:</label>
            <input type="text" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleInputChange} />
          </div>
          <div className="two-column">
            <div className="form-row">
              <label>Month/Year:</label>
              <input type="text" name="monthYear" placeholder="MM/YY" value={formData.monthYear} onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <label>CVC:</label>
              <input type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Billing Address</h2>
          <div className="form-row">
            <label>
              Billing Address Same as Shipping:
              <input type="checkbox" name="billingAddressSame" checked={formData.billingAddressSame} onChange={handleInputChange} />
            </label>
          </div>
          {!formData.billingAddressSame && (
            <>
              <div className="form-row">
                <label>Billing Name:</label>
                <input type="text" name="billingName" value={formData.billingName} onChange={handleInputChange} />
              </div>
              <div className="form-row">
                <label>Billing Address:</label>
                <input type="text" name="billingAddress" value={formData.billingAddress} onChange={handleInputChange} />
              </div>
              <div className="two-column">
                <div className="form-row">
                  <label>Billing City:</label>
                  <input type="text" name="billingCity" value={formData.billingCity} onChange={handleInputChange} />
                </div>
              </div>
            </>
          )}
        </div>

        <button type="submit">Complete Checkout and Pay</button>
      </form>

      <div className="cart">
        <h2>Current Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} <br />{item.size} x1 <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="discount-code">
          <input type="text" placeholder="Discount Code" />
          <button>Apply</button>
        </div>
        <p>CART TOTALS <span>${cartTotal.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default CheckoutForm;
