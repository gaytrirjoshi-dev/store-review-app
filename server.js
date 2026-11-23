const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
app.use(cors());
app.use(express.json());

// VALIDATION FUNCTION
function checkValid(name, address, password) {
  if (!name || name.length < 20 || name.length > 60) return 'Name 20-60 chars pahije!';
  if (address && address.length > 400) return 'Address 400 chya aat pahije!';
  if (!password || password.length < 8 || password.length > 16 || !/[A-Z]/.test(password) || !/[^A-Za-z0-9]/.test(password)) return 'Password 8-16, 1 Capital + 1 Special pahije!';
  return null;
}

// 1. REGISTER - Normal User
app.post('/api/register', (req, res) => {
  const { name, email, password, address } = req.body;
  const err = checkValid(name, address, password);
  if (err) return res.json({ error: err });
  db.query('INSERT INTO users (name,email,password,address,role) VALUES (?,?,?,?,?)', [name, email, password, address, 'user'], (e) => {
    if (e) return res.json({ error: 'Email aadhi vaparloy!' });
    res.json({ success: true });
  });
});

// 2. LOGIN - Ekach saglyansathi
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT id, name, email, address, role FROM users WHERE email=? AND password=?', [email, password], (e, r) => {
    if (r.length === 0) return res.json({ error: 'Email / Password chukicha!' });
    res.json({ success: true, user: r[0] });
  });
});

// 3. ADMIN - Dashboard Counts
app.get('/api/admin/dashboard', (req, res) => {
  db.query('SELECT (SELECT COUNT(*) FROM users) as totalUsers, (SELECT COUNT(*) FROM stores) as totalStores, (SELECT COUNT(*) FROM ratings) as totalRatings', (e, r) => res.json(r[0]));
});

// 4. ADMIN - Users List + User Detail (Owner asel tar Rating pan)
app.get('/api/admin/users', (req, res) => {
  db.query(`SELECT u.*, AVG(r.rating) as ownerRating FROM users u LEFT JOIN stores s ON s.owner_id=u.id LEFT JOIN ratings r ON r.store_id=s.id GROUP BY u.id`, (e, r) => res.json(r));
});

// 5. ADMIN - Stores List
app.get('/api/admin/stores', (req, res) => {
  db.query('SELECT s.*, AVG(r.rating) as avgRating FROM stores s LEFT JOIN ratings r ON r.store_id=s.id GROUP BY s.id', (e, r) => res.json(r));
});

// 6. ADMIN - Add User (Normal / Admin / Owner)
app.post('/api/admin/add-user', (req, res) => {
  const { name, email, password, address, role } = req.body;
  const err = checkValid(name, address, password);
  if (err) return res.json({ error: err });
  db.query('INSERT INTO users (name,email,password,address,role) VALUES (?,?,?,?,?)', [name, email, password, address, role], (e) => res.json({ success: !e, error: e ? 'Email aadhi vaparloy!' : null }));
});

// 7. ADMIN - Add Store
app.post('/api/admin/add-store', (req, res) => {
  const { name, email, address, owner_id } = req.body;
  db.query('INSERT INTO stores (name,email,address,owner_id) VALUES (?,?,?,?)', [name, email, address, owner_id || null], (e) => res.json({ success: !e }));
});

// 8. USER - Stores List + Search + My Rating
app.get('/api/stores', (req, res) => {
  const search = req.query.search || '';
  const userId = req.query.userId || 0;
  const q = `SELECT s.*, AVG(r.rating) as avgRating, MAX(CASE WHEN r.user_id=? THEN r.rating END) as myRating FROM stores s LEFT JOIN ratings r ON r.store_id=s.id WHERE s.name LIKE ? OR s.address LIKE ? GROUP BY s.id`;
  db.query(q, [userId, `%${search}%`, `%${search}%`], (e, r) => res.json(r));
});

// 9. USER - Rating De / Badal
app.post('/api/rate', (req, res) => {
  const { user_id, store_id, rating } = req.body;
  if (rating < 1 || rating > 5) return res.json({ error: 'Rating 1-5 pahije!' });
  db.query('INSERT INTO ratings (user_id, store_id, rating) VALUES (?,?,?) ON DUPLICATE KEY UPDATE rating=?', [user_id, store_id, rating, rating], (e) => res.json({ success: !e }));
});

// 10. OWNER - Tyacha Store + Kon koni Rating dili + Avg
app.get('/api/owner/:ownerId', (req, res) => {
  db.query('SELECT s.*, AVG(r.rating) as avgRating FROM stores s LEFT JOIN ratings r ON r.store_id=s.id WHERE s.owner_id=? GROUP BY s.id', [req.params.ownerId], (e, stores) => {
    if (!stores.length) return res.json({ store: null, ratings: [] });
    db.query('SELECT u.name, u.email, r.rating FROM ratings r JOIN users u ON r.user_id=u.id WHERE r.store_id=?', [stores[0].id], (e2, ratings) => res.json({ store: stores[0], ratings }));
  });
});

// 11. UPDATE PASSWORD - User + Owner
app.post('/api/update-password', (req, res) => {
  const { userId, newPassword } = req.body;
  const err = checkValid('Gayatri Ravikumar Joshi Extra Name', '', newPassword);
  if (err && err.includes('Password')) return res.json({ error: err });
  db.query('UPDATE users SET password=? WHERE id=?', [newPassword, userId], (e) => res.json({ success: !e }));
});

app.listen(5000, () => console.log('Backend 5000 var 🚀'));