import './App.css'
import './assets/css/common.css'
import {RouterProvider} from 'react-router-dom';
import router from './routes/Router.tsx';
import AuthProvider from './hooks/authProvider';

function App() {

  return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  )
}

export default App
