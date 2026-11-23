import { useState } from 'react';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SADashboard from './SADashboard';
import NUDashboard from './NUDashboard';
import SODashboard from './SODashboard';
import './App.css';

export default function StoreReview() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  if (!user) {
    return showRegister ? <RegisterPage onBack={() => setShowRegister(false)} /> : <LoginPage onLogin={setUser} onRegister={() => setShowRegister(true)} />;
  }
  
  const role = String(user.role || '').toLowerCase().trim();
  console.log('Login User:', user, 'Role:', role); 

  if (role === 'admin') return <SADashboard user={user} onLogout={() => setUser(null)} />;
  if (role === 'owner' || role === 'store_owner' || role === 'store owner') return <SODashboard user={user} onLogout={() => setUser(null)} />;
  return <NUDashboard user={user} onLogout={() => setUser(null)} />;
}