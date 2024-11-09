import {createBrowserRouter} from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard.tsx';
import SignIn from '../components/login/signin.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Employees from '../components/employees/Employees.tsx';
import EmployeeDetail from '../components/employees/EmployeeDetail.tsx';

// Create the router configuration
const router = createBrowserRouter(
  [
    {
      path: '/signin',
      element: <SignIn />,
      index: true
    },
    {
      element: <ProtectedRoute />,
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
          element: <Employees />
        },
        {
          path: '/employee-detail',
          element: <EmployeeDetail />
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