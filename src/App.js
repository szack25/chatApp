import Register from './pages/Register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import Home from './pages/Home';
import Profile from './pages/Components/Profile';
import '../src/style.css';

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/register" />
    }
    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
