
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { Link, useNavigate } from "react-router-dom";



const Register = ()=> {
    const navigate = useNavigate();
    const API_URL = localStorage.getItem("API_URL");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
   const config = {
    headers: { 
        Accept : 'application/json' ,
    }
   }
    const handleSignUp = async () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = "Name is required";
        }
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email address";
        }
        // if (!phone.trim()) {
        //     errors.phone = "Phone is required";
        // } else if (!/^\d{10}$/.test(phone)) {
        //     errors.phone = "Invalid phone number";
        // }
        if (!password.trim()) {
            errors.password = "Password is required";
        }
        if (!passwordConfirmation.trim()) {
            errors.passwordConfirmation = "Password confirmation is required";
        } else if (passwordConfirmation !== password) {
            errors.passwordConfirmation = "Passwords do not match";
        }

        if (Object.keys(errors).length === 0) {
            try {
                const SignUpResponse = await axios.post(API_URL+ '/register', {
                    name :name ,
                    email: email,
                    // phone :phone ,
                    password: password,
                    password_confirmation :passwordConfirmation
                });
    
                if (SignUpResponse.status === 200 || SignUpResponse.status === 201) {
                    const data = SignUpResponse.data;
                    if (data.token) {
                        toast.success('You  created new with us  thank you . login and Enjoy!');
                        navigate("/");
                    } else {
                        toast.error(data.error);
                    }
                } else {
                    toast.error('register failed');
                }
            } catch (error) {
                toast.error('Error occurred during register');
                console.error('Error during register', error);
            }
        } else {
            // If there are errors, update the state to display them
            setErrors(errors);
        }
    }
    
 
 

    
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="w-full max-w-lg px-8 py-10 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-semibold">Sign Up</h1>
        <p className="mb-6 text-gray-600">Please enter your details to sign up.</p>
        <div className="space-y-4">
            <div className="flex flex-col">
                <label className="text-lg font-medium">Name</label>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 bg-gray-100 rounded-xl"
                    placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="flex flex-col">
                <label className="text-lg font-medium">Email</label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 bg-gray-100 rounded-xl"
                    placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
                <label className="text-lg font-medium">Phone</label>
                <input 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4 bg-gray-100 rounded-xl"
                    placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>
            <div className="flex flex-col">
                <label className="text-lg font-medium">Password</label>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 bg-gray-100 rounded-xl"
                    placeholder="Enter your password"
                    type="password"
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <div className="flex flex-col">
                <label className="text-lg font-medium">Confirm Password</label>
                <input 
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full p-4 bg-gray-100 rounded-xl"
                    placeholder="Confirm your password"
                    type="password"
                />
                {errors.passwordConfirmation && <p className="text-red-500">{errors.passwordConfirmation}</p>}
            </div>
            <div className="flex items-center justify-center">
                <button 
                    onClick={handleSignUp}
                    className="px-6 py-3 font-semibold text-white transition-colors bg-blue-500 rounded-xl hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Sign up
                </button>
            </div>
            <div className="flex items-center justify-center">
                <p className="text-base font-medium">Already have an account?</p>
                <Link to="/login" className="ml-2 text-blue-500">Login</Link>
            </div>
        </div>
    </div>
</div>

);

};

export default Register;