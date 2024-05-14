
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { Link, useNavigate } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate();
    const API_URL = localStorage.getItem("API_URL");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email.trim() === '' || password.trim() === '') {
            toast.error('Error: Email or password cannot be empty.');
            return;
        }

        try {
            const loginResponse = await axios.post(API_URL + '/login', {
                email: email,
                password: password
            });

            if (loginResponse.status === 200 || loginResponse.status === 201) {
                const data = loginResponse.data;
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user' , JSON.stringify(data.user)) ;
                    toast.success('You are logged in. Enjoy!');
                    navigate("/");
                } else {
                    toast.error(data.error);
                }
            } else {
                toast.error('Login failed');
            }
        } catch (error) {
            toast.error('Error occurred during login');
            console.error('Error during login', error);
        }
    }
 
 

    
  return (
    <div className="flex w-full h-screen">
      <div className="flex items-center justify-center w-full lg:w-1/2">
      <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Welcome Back</h1>
            <p className='mt-4 text-lg font-medium text-gray-500'>Welcome back! Please enter you details.</p>
            <div className='mt-8'>
                <div className='flex flex-col'>
                    <label className='text-lg font-medium'>Email</label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl'
                        placeholder="Enter your email"/>
                </div>
                <div className='flex flex-col mt-4'>
                    <label className='text-lg font-medium'>Password</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl'
                        placeholder="Enter your email"
                        type={"password"}
                    />
                </div>
                <div className='flex items-center justify-between mt-8'>
                    <div>
                        <input  type="checkbox" id='remember'/>
                        <label className='ml-2 text-base font-medium' htmlFor="remember">Remember for 30 days</label>
                    </div>
                    <button className='text-base font-medium text-violet-500'>Forgot password</button>
                </div>
                <div className='flex flex-col mt-8 gap-y-4'>
                    <button 
                        onClick={handleLogin}
                        className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Sign in</button>
                    <button 
                        className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 '>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                                <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                                <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                                <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                            </svg>
                            Sign in with Google
                    </button>
                </div>
                <div className='flex items-center justify-center mt-8'>
                    <p className='text-base font-medium'>Don't have an account?</p>
                    <Link to={`/register`}>
                    <button 
                        className='ml-2 text-base font-medium text-violet-500'>Sign up
                        </button>
                </Link>
                </div>
            </div>
        </div>
      </div>
      <div className="relative items-center justify-center hidden w-1/2 h-full lg:flex">
      <img
            src="https://images.keepersport.net/eyJidWNrZXQiOiJrZWVwZXJzcG9ydC1wcm9kdWN0LWltYWdlcy11cy1lYXN0LTEiLCJrZXkiOiJhZGlkYXNcLzEwMjYxOTMxX0lBNTEzOV8wMDBcL2FkaWRhcy1yZWFsLW1hZHJpZC1hLXRyaWtvdC1ob21lLTIwMjMtMjAyNC13ZWlzcy1pYTUxMzktZmFuLXNob3BfZGV0YWlsLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODAwfX19"
            alt="img"
            width={400}
            height={400} 
            className="absolute w-[500px] h-[500px] object-cover md:w-[300px] md:h-[300px] lg:w-[550px] lg:h-[550px] top-[10%] left-[5%] md:left-[20%] hover:translate-y-4 transition-all ease-in-out duration-1000"

          />
      </div>
    </div>
  );
};

export default Login;