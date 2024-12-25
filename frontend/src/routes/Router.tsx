import {createBrowserRouter} from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import SignIn from '../components/login/signin';
import ProtectedRoute from './ProtectedRoute';
import Employees from '../components/employees/Employees';
import EmployeeDetail from '../components/employees/EmployeeDetail';
import Attendances from '../components/Attendances/Attendances';

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
        }, {
        path: '/attendances',
          element: <Attendances />
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