
import { useEffect, useState } from 'react';
import UpdatePassword from './UpdatePassword';
export default function SODashboard({ user, onLogout }) {
  const [data, setData] = useState({ stores: null, ratings: [] }); const [showPass, setShowPass] = useState(false);
  useEffect(() => { fetch(`http://localhost:5000/api/owner/${user.id}`).then(r => r.json()).then(setData); }, []);
  if (showPass) return <UpdatePassword user={user} onBack={() => setShowPass(false)} />;
  if (!data.stores || data.stores.length === 0) return <div style={{ padding: 20 }}><h2>Owner Dashboard</h2><p>You have not assign any store . please meet to admin!</p><button onClick={onLogout}>Logout</button></div>;
  return <div style={{ padding: 20 }}><h2>Owner Dashboard - {data.stores[0].name}</h2><button onClick={() => setShowPass(true)}>Update Password</button> <button onClick={onLogout}>Logout</button>
    <h3>Average Rating: {Number(data.stores[0].avgRating || 0).toFixed(1)} ⭐ ({data.ratings.length} Ratings)</h3>
    <h3>People who gives Rating to your store:</h3>
    <table border="1" cellPadding="8"><thead><tr><th>User Name</th><th>Email</th><th>Rating</th></tr></thead>
      <tbody>{data.ratings.map((r, i) => <tr key={i}><td>{r.name}</td><td>{r.email}</td><td>{r.rating} ⭐</td></tr>)}</tbody></table></div>;
}


