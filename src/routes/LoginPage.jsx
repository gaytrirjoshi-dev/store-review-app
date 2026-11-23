import React, { useState } from 'react';
import './Register.css';
function UserLogin({ onSuccess, onGoRegister }) {
  const [formdata, setformdata] = useState({ email: '', password: '' });
  const [fail, setfail] = useState({});
  const DataSave = (data) => {
    setformdata({ ...formdata, [data.target.name]: data.target.value });
    setfail({ ...fail, [data.target.name]: '' });
  };
  const InfoChecking = (IC) => {
    IC.preventDefault();
    const cleanEmail = formdata.email.trim().toLowerCase();
    const cleanPass = formdata.password.trim();
    // 👈 AATA 2 JAGI SHODHNAAR - users + lastUser
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const lastUser = JSON.parse(localStorage.getItem("lastUser") || "null");
    let foundUser = allUsers.find(u => u.email.trim().toLowerCase() === cleanEmail && u.password.trim() === cleanPass);
    if (!foundUser && lastUser && lastUser.email.trim().toLowerCase() === cleanEmail && lastUser.password.trim() === cleanPass) {
      foundUser = lastUser;
    }
    if (!foundUser) { alert("User not found! Please Register first. Console madhe SAVED USER bagh"); return; }
    alert(`Login Successful !`);
    onSuccess(foundUser);
  };
  return (
    <div className="Register-container"><div className="Register-card">
      <h2>Welcome Back</h2><p>Store Rating App - Login</p>
      <form onSubmit={InfoChecking}>
        <label>Email</label><input type="email" name="email" value={formdata.email} onChange={DataSave} />
        <label>Password</label><input type="password" name="password" value={formdata.password} onChange={DataSave} />
        <button type="submit">Login</button>
      </form>
      <p className="login-link">New User? <a href="#" onClick={(e) => { e.preventDefault(); onGoRegister(); }}>Create Account</a></p>
    </div></div>
  );
}
export default UserLogin;