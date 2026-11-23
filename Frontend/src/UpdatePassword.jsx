import { useState } from 'react';
export default function UpdatePassword({ user, onBack }) {
  const [np, setNp] = useState('');
  const update = async () => {
    const r = await fetch('http://localhost:5000/api/update-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, newPassword: np }) });
    const d = await r.json(); alert(d.error || 'Password is changed'); if (!d.error) onBack();
  };
  return <div style={{ padding: 20 }}><h2>Update Password</h2><input type="password" placeholder="New Password (8-16, 1 Capital + 1 Special)" value={np} onChange={e => setNp(e.target.value)} style={{ width: 300, padding: 10 }} /><br /><br /><button onClick={update}>Update</button> <button onClick={onBack}>Back</button></div>;
}