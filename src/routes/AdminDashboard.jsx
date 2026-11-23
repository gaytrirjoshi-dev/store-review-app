import React, { useState, useEffect } from 'react';

function AdminDashboard({ onLogout }) {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users") || "[]"));
  const [stores, setStores] = useState(JSON.parse(localStorage.getItem("stores") || JSON.stringify([
    { name: "Sanvi collection", address: "Wagholi", rating: 3 },
    { name: "Patel shoehouse", address: "Hinjewadi", rating: 4 },
  ])));
  const [ratings, setRatings] = useState(JSON.parse(localStorage.getItem("ratings") || "[]"));

  const [newStore, setNewStore] = useState({ name: '', address: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });

  // Save hot rahil
  useEffect(() => { localStorage.setItem("stores", JSON.stringify(stores)); }, [stores]);
  useEffect(() => { localStorage.setItem("users", JSON.stringify(users)); }, [users]);

  const addStore = (e) => {
    e.preventDefault();
    if(!newStore.name) return alert("Dukanache nav tak!");
    setStores([...stores, { ...newStore, rating: 0 }]);
    setNewStore({ name: '', address: '' });
    alert("Dukan Add Zala Boss!");
  };

  const addUser = (e) => {
    e.preventDefault();
    if(!newUser.email) return alert("Email tak!");
    setUsers([...users, { ...newUser, address: 'Added by Admin', storename: '' }]);
    setNewUser({ name: '', email: '', password: '', role: 'user' });
    alert("User Add Zala Boss!");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h1>👑 Admin Dashboard - Boss</h1>
      <button onClick={onLogout} style={{ float: 'right' }}>Logout</button>

      {/* 👈 3 NUMBER - VAR */}
      <div style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
        <div style={{ background: '#4CAF50', color: 'white', padding: '20px', borderRadius: '10px', flex: 1, textAlign: 'center' }}>
          <h2>{users.length}</h2><p>Total Users</p>
        </div>
        <div style={{ background: '#2196F3', color: 'white', padding: '20px', borderRadius: '10px', flex: 1, textAlign: 'center' }}>
          <h2>{stores.length}</h2><p>Total Dukane</p>
        </div>
        <div style={{ background: '#FF9800', color: 'white', padding: '20px', borderRadius: '10px', flex: 1, textAlign: 'center' }}>
          <h2>{ratings.length}</h2><p>Total Ratings</p>
        </div>
      </div>

      {/* 👈 DUKAN ADD */}
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
        <h3>➕ Navin Dukan Add Kar</h3>
        <form onSubmit={addStore} style={{ display: 'flex', gap: '10px' }}>
          <input placeholder="Dukanache Nav - Ex: Joshi Kirana" value={newStore.name} onChange={e => setNewStore({...newStore, name: e.target.value})} />
          <input placeholder="Address" value={newStore.address} onChange={e => setNewStore({...newStore, address: e.target.value})} />
          <button>Add Dukan</button>
        </form>
      </div>

      {/* 👈 USER ADD */}
      <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
        <h3>➕ Navin User Add Kar</h3>
        <form onSubmit={addUser} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input placeholder="Nav - 20 chars" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
          <input placeholder="Email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
          <input placeholder="Password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
          <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
            <option value="user">Normal User</option>
            <option value="owner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>
          <button>Add User</button>
        </form>
      </div>

      {/* 👈 SAGLYA USER CHI LIST */}
      <h3>📋 Saglya User Chi List - {users.length} Jan</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr><th>Nav</th><th>Email</th><th>Role</th><th>Dukan</th></tr></thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.storename || '-'}</td></tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '20px' }}>🏪 Saglya Dukana Chi List</h3>
      {stores.map((s, i) => <p key={i}>• {s.name} - {s.address} - ⭐ {s.rating}</p>)}
    </div>
  );
}
export default AdminDashboard;