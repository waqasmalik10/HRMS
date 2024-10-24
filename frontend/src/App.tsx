// import { useState } from 'react'
import { useEffect, useState } from 'react';
import './App.css'
import './Components/login/signin'
import { jwtDecode } from 'jwt-decode';
import { RouterProvider } from 'react-router-dom';
import router from './Router';

function App() {

  const [, setUser] = useState(
    JSON.parse(localStorage.getItem("user") as string)
  );

  const checkTokenExpiration = () => {
    const userToken = JSON.parse(localStorage.getItem("user") as string)?.access_token;
    if (!userToken) {
      setUser(null);
      return;
    }

    const decodedToken: any = jwtDecode(userToken) || "";
    const expirationTime = decodedToken?.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;

    if (timeUntilExpiration > 0) {
      setTimeout(() => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/signin"; // Redirect to the login page
      }, timeUntilExpiration);
    } else {
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/signin"; // Redirect to the login page
    }
  };

  // Token expiration check
  useEffect(() => {
    checkTokenExpiration();
  }, []);


  return (
    <RouterProvider router={router} />
  )
}

export default App
