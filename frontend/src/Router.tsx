import { createBrowserRouter } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import Login from './Login';
// import ProtectedRoute from './ProtectedRoute';
// import Chat from './Chat';
// import ChatList from './ChatList';
// import Video from './Video';
// import Room from './Room';
import Dashboard from './Components/dashboard/Dashboard';
import SignIn from './Components/login/signin';
import ProtectedRoute from './ProtectedRoute';
import EmployeesOverview from './Components/employees/EmployeesOverview';

// Function to get the access token from cookies
const getAccessToken = () => {
  const userToken = JSON.parse(localStorage.getItem("user") as string)?.access_token;
  return userToken;
}

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!getAccessToken();
}

// Create the router configuration
const router = createBrowserRouter(
  [
    {
      path: '/signin',
      element: <SignIn />,
      index: true
    },
    {
      element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/',
          element: <Dashboard />
        },
        {
          path: '/employees',
          element: <EmployeesOverview />
        }
      ]
    },
    {
      path: '*',
      element: <p>404 Error - Nothing here...</p>
    }
  ]
);

export default router;