import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authSelector } from '../store/usersSlice';
import { useAppSelector } from '../utils/hooks/hook';
import LoginPage from './pages/LoginPage/LoginPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  const auth = useAppSelector(authSelector);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={auth ? <MainPage /> : <Navigate to={'/login'} />} />
        <Route path={'/login'} element={auth ? <Navigate to={'/'} /> : <LoginPage />} />
        <Route path={'/logout'} element={<LogoutPage />} />
        <Route path={'*'} element={<p>404 Страницы не существует! </p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
