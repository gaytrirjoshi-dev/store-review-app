import { useEffect, useState } from 'react';

export default function SADashboard({ user, onLogout }) {
  const [Likes, setLikes] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formRole, setFormRole] = useState('');
  const [sortName, setSortName] = useState('');
  const [sortEmail, setSortEmail] = useState('');
  const [sortAddress, setSortAddress] = useState('');
  
  const [sortWord, setSortWord] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  
  const [nu, setNu] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const [ns, setNs] = useState({ name: '', email: '', address: '', owner_email: '' });

  const load = () => {
    fetch('http://localhost:5000/api/admin/dashboard').then(a => a.json()).then(setLikes);
    fetch('http://localhost:5000/api/admin/users').then(a => a.json()).then(setUsers);
    fetch('http://localhost:5000/api/admin/stores').then(a => a.json()).then(setStores);
  };
  useEffect(load, []);

  const addUser = async () => {
    const a = await fetch('http://localhost:5000/api/admin/add-user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nu) }).then(r => r.json());
    alert(a.error || 'User Added!'); if (a.success) load();
  };
  const addStore = async () => {
    const a = await fetch('http://localhost:5000/api/admin/add-store', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ns) }).then(r => r.json());
    alert(a.error || 'Store Added!'); if (a.success) load();
  };

  const sortFn = (a, b) => {
    const c = String(a[sortWord] || '').toLowerCase();
    const d = String(b[sortWord] || '').toLowerCase();
    return sortDir === 'asc' ? c.localeCompare(d) : d.localeCompare(c);
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(formName.toLowerCase()) &&
    u.email.toLowerCase().includes(formEmail.toLowerCase()) &&
    (u.address || '').toLowerCase().includes(formAddress.toLowerCase()) &&
    (formRole === '' || u.role === formRole)
  ).sort(sortFn);

  const filteredStores = stores.filter(s =>
    s.name.toLowerCase().includes(sortName.toLowerCase()) &&
    (s.email || '').toLowerCase().includes(sortEmail.toLowerCase()) &&
    (s.address || '').toLowerCase().includes(sortAddress.toLowerCase())
  ).sort(sortFn);

  return (
    <div>
      <h2> Dashboard - {user.name}</h2>
      <p>Total Users: {Likes.totalUsers} | Total Stores: {Likes.totalStores} | Total Likes: {Likes.totalLikes}</p>
      <button onClick={onLogout}>Logout</button>

      <h3>Add User (Systen Administrator / Store Owner / Normal Users)</h3>
      <input placeholder="Name 20-60" onChange={a => setNu({ ...nu, name: a.target.value })} />
      <input placeholder="Email" onChange={a => setNu({ ...nu, email: a.target.value })} />
      <input placeholder="Address" onChange={a => setNu({ ...nu, address: a.target.value })} />
      <input type="password" placeholder="Password" onChange={a => setNu({ ...nu, password: a.target.value })} />
      <select onChange={a => setNu({ ...nu, role: a.target.value })}><option value="user">Normal User</option><option value="owner">Store Owner</option><option value="admin">System Administrator</option></select>
      <button onClick={addUser}>Add User</button>

      <h3>Add Store + Owner Link</h3>
      <input placeholder="Store Name 20-60" onChange={a => setNs({ ...ns, name: a.target.value })} />
      <input placeholder="Store Email" onChange={a => setNs({ ...ns, email: a.target.value })} />
      <input placeholder="Store Address" onChange={a => setNs({ ...ns, address: a.target.value })} />
      <input placeholder="Owner cha Email Type Kara (jya Owner la he dukan dyaychay)" onChange={a => setNs({ ...ns, owner_email: a.target.value })} />
      <button onClick={addStore}>Add Store</button>

      <h3>Sorting</h3>
      <select onChange={a => setSortWord(a.target.value)}><option value="name">Name</option><option value="email">Email</option><option value="address">Address</option></select>
      <button onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}>{sortDir === 'asc' ? 'Asc ↑' : 'Desc ↓'}</button>

      <h3>Users - Filter</h3>
      <input placeholder="Filter Name" onChange={a => setFormName(a.target.value)} />
      <input placeholder="Filter Email" onChange={a => setFormEmail(a.target.value)} />
      <input placeholder="Filter Address" onChange={a => setFormAddress(a.target.value)} />
      <select onChange={a => setFormRole(a.target.value)}><option value="">All Roles</option><option value="user">User</option><option value="owner">Owner</option><option value="admin">Admin</option></select>
      <table><thead><tr><th>Name</th><th>Email</th><th>Address</th><th>Role</th><th>Owner Rating</th><th>View</th></tr></thead>
        <tbody>{filteredUsers.map(u => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.address}</td><td>{u.role}</td><td>{u.role === 'owner' ? (u.ownerRating ? Number(u.ownerRating).toFixed(1) : 'No Rating') : '-'}</td><td><button onClick={() => setSelectedUser(u)}>View</button></td></tr>)}</tbody></table>

      {selectedUser && <div><h4>User Detail</h4><p>Name: {selectedUser.name}</p><p>Email: {selectedUser.email}</p><p>Address: {selectedUser.address}</p><p>Role: {selectedUser.role}</p>{selectedUser.role === 'owner' && <p>Rating: {selectedUser.ownerRating ? Number(selectedUser.ownerRating).toFixed(1) : 'No Rating'}</p>}<button onClick={() => setSelectedUser(null)}>Close</button></div>}

      <h3>Stores - Filter</h3>
      <input placeholder="Filter Store Name" onChange={a => setSortName(a.target.value)} />
      <input placeholder="Filter Store Email" onChange={a => setSortEmail(a.target.value)} />
      <input placeholder="Filter Store Address" onChange={a => setSortAddress(a.target.value)} />
      <table><thead><tr><th>Name</th><th>Email</th><th>Address</th><th>Rating</th></tr></thead>
        <tbody>{filteredStores.map(s => <tr key={s.id}><td>{s.name}</td><td>{s.email}</td><td>{s.address}</td><td>{s.avgRating ? Number(s.avgRating).toFixed(1) : 'No Rating'}</td></tr>)}</tbody></table>
    </div>
  );
}