import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login/login';
import Pending from './pages/pending/pending';

export default function App() {
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) nav('/pending');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pending" element={<Pending />} />
    </Routes>
  );
}
