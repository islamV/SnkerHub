import React, { useEffect } from "react";
import axios  from "axios";
const Login = () => {
    
    useEffect(()=>{
     const API_URL = 'https://generalapi.test/api/';
   


async function login() {
  try {
    // Login request with email and password
    const loginResponse = await axios.post(API_URL + 'login', {
      email: 'islam@islam.com',
      password: '12345678'
    });

    // Check for successful login (status code 200 or similar)
    if (loginResponse.status === 200 || loginResponse.status === 201) { // Adjust based on API's success code
      const data = loginResponse.data;

      if (data.token) {
        const authToken = data.token;
        console.log('Authentication successful! Token:', authToken);
        makeAuthorizedRequest(authToken);
      } else {
        console.error('Error: Missing auth token in login response.');
      }
    } else {
      console.error('Login failed:', loginResponse.data); // Log error details for troubleshooting
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
}

// // Example function to demonstrate using the obtained authToken for an API request
// async function makeAuthorizedRequest(authToken) {
//   try {
//     const config = {
//       headers: { Authorization: `Bearer ${authToken}` } // Use 'Bearer' for token-based auth
//     };

//     const authorizedResponse = await axios.get(API_URL + 'v1/product/get/1', config);
//     console.log('Authorized request response:', authorizedResponse.data);
//   } catch (error) {
//     console.error('Error during authorized request:', error);
//   }
// }

loginAndGetAuthToken();
   

// async function login(){ 
//     try {
//         const loginRespons =  await axios.post(API_URL+'login' , {
//             email: 'islam@islam.com',
//              password: '12345678'
//         });
         
//         if(loginRespons.status ==200 ){
//             const data = loginRespons.data ;
//             if (data.token) {
//                 const authToken  = data.token ;
//                 request(authToken) ;
//             }else{
//             console.log('error tokan');

//             }
//         }else{
//             console.log('error');
//         }
//     } catch (error) {
//         console.log(error) ;
//     }


// }
// async function request(token){
// try {
//        const config = {
//       headers: { 
//         Accept : 'application/json' ,
//         Authorization: `Bearer ${token}`
//      }  
//     };
//     const product = {
//         description: 'new des', 
//         price : '1500' 
        
//     };
//     const request = await axios.put(API_URL+'v1/product/update/2' , product , config)
    
//     console.log(request.data) ;
// } catch (error) {
//     console.log(error) ;
// }

// }
    // login() ;
 },[])
  return (
          <div className="bg-gray-50 dark:bg-[#121212] h-full overflow-y-hidden"> Hello</div>
  );
};

export default Login;
