import { useState } from 'react';

export default function RegisterPage({ onBack }) {
  const [formdata, setFormdata] = useState({ name: '', email: '', address: '', password: '' });
  const [message, setMessage] = useState('');

  const RegisterDataHandle = async () => {
    if (!formdata.name || formdata.name.length < 20 || formdata.name.length > 60) return setMessage('Maximun Range of your name between 20-60 characters!');
    if (formdata.address.length > 400) return setMessage('Maximum Range of your address 400 characters!');
    if (!formdata.password || formdata.password.length < 8 || formdata.password.length > 16 || !/[A-Z]/.test(formdata.password) || !/[^A-Za-z0-9]/.test(formdata.password)) return setMessage('Maximum Range of your Password between 8-16 range contain one capital letter and special characters');
    const b = await fetch('http://localhost:5000/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formdata) }).then(r => r.json());
    if (b.error) return setMessage(b.error);
    setMessage('Registration successful!Go toward Login');
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Registration Page For Normal User</h2>
      <input placeholder="Full Name (20-60 chars)" style={{ width: '100%', padding: 10, margin: 5 }} onChange={a => setFormdata({ ...formdata, name: a.target.value })} />
      <input placeholder="Email" style={{ width: '100%', padding: 10, margin: 5 }} onChange={a => setFormdata({ ...formdata, email: a.target.value })} />
      <input placeholder="Address" style={{ width: '100%', padding: 10, margin: 5 }} onChange={a => setFormdata({ ...formdata, address: a.target.value })} />
      <input type="password" placeholder="Password (8-16, 1 Capital + 1 Special)" style={{ width: '100%', padding: 10, margin: 5 }} onChange={a => setFormdata({ ...formdata, password: a.target.value })} />
      <button onClick={RegisterDataHandle} style={{ width: '100%', padding: 10, margin: 5 }}>Register</button>
      <p style={{ color: 'red' }}>{message}</p>
      <button onClick={onBack}>Go towards LoginPage</button>
    </div>
  );
}