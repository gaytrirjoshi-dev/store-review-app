import { useState } from 'react';
export default function LoginPage({ onLogin, onRegister }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const login = async () => {
    const res = await fetch('http://localhost:5000/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const d = await res.json();
    if (d.error) alert(d.error); else onLogin(d.user);
  };
  return <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}><h2>LoginPage For Store Rating App</h2>
    <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 10, marginBottom: 10 }} /><br />
    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 10 }} /><br /><br />
    <button onClick={login}>Login</button> <button onClick={onRegister}>Register</button>
     <div style={{ marginTop: 20, padding: 15, background: '#f0f4ff', border: '1px solid #c7d2fe', borderRadius: 10, textAlign: 'left', maxWidth: 400 }}>
  <h4 style={{ margin: '0 0 10px 0' }}>Demo Accounts for Run this Project</h4>
  <p style={{ margin: '5px 0' }}><b>System Administrator:</b> gayatri.A@gmail.com / Gayatri@123</p>
  <p style={{ margin: '5px 0' }}><b>Store Owner:</b> gayatri.owner@gmail.com / Gayatri@123</p>
   <p style={{ margin: '5px 0' }}><b>Normal User:</b> gaytrirjoshi@gmail.com / Gayatri@123</p>
  <p style={{ fontSize: 12, color: '#555' }}>Note: Please use above data to check all Roles in this project.</p>
</div>
    </div>;
   
}