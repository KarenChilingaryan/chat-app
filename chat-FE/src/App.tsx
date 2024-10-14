import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ChatApp from './components/ChatApp';
import PrivateRoute from './components/privateRoute';
import Signup from './components/SignUp';
import PublicRoute from './components/publicRoute';
import { store } from './store/store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;

  return (

    <Provider store={store}>

      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatApp />
              </PrivateRoute>
            }
          />

          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/chat" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
