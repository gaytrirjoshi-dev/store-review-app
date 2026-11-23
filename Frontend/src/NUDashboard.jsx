import { useEffect, useState } from 'react';
import UpdatePassword from './UpdatePassword';
export default function NUDashboard({ user, onLogout }) {
  const [stores, setStores] = useState([]); const [search, setSearch] = useState(''); const [showPass, setShowPass] = useState(false);
  const loaddata = () => fetch(`http://localhost:5000/api/stores?search=${search}&userId=${user.id}`).then(r => r.json()).then(setStores);
  useEffect(() => { loaddata(); }, [search]);
  const r = async (storeId, rating) => {
    await fetch('http://localhost:5000/api/rate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user.id, store_id: storeId, rating }) });
    loaddata();
  };
  if (showPass) return <UpdatePassword user={user} onBack={() => setShowPass(false)} />;
  return <div style={{ padding: 20 }}><h2>Hi {user.name} - Stores</h2><button onClick={() => setShowPass(true)}>Update Password</button> <button onClick={onLogout}>Logout</button><br /><br />
    <input placeholder="Search Store by Name / Address" value={search} onChange={e => setSearch(e.target.value)} style={{ width: 300, padding: 10 }} />
    <table border="1" cellPadding="8" style={{ marginTop: 10 }}><thead><tr><th>Store Name</th><th>Address</th><th>Overall Rating</th><th>Your Rating</th><th>Rate</th></tr></thead>
      <tbody>{stores.map(s => <tr key={s.id}><td>{s.name}</td><td>{s.address}</td><td>{Number(s.avgRating || 0).toFixed(1)} ⭐</td><td>{s.myRating ? s.myRating + ' ⭐' : 'Not Rated'}</td>
        <td>{[1, 2, 3, 4, 5].map(n => <button key={n} onClick={() => r(s.id, n)} style={{ background: s.myRating === n ? 'gold' : '' }}>{n}⭐</button>)}<br /><small>{s.myRating ? 'Modify karu shakto!' : 'Submit kar!'}</small></td></tr>)}</tbody></table></div>;
}