import React, { useState } from 'react';
import './Register.css';

function UserData({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const [errors, setErrors] = useState({});

  const DataSave = (data) => {
    setForm({ ...form, [data.target.name]: data.target.value });
    setErrors({ ...errors, [data.target.name]: '' });
  };

  const CorrectData = () => {
    let WrongInfo = {};
    
    if (form.name.length < 20) WrongInfo.name = "Please Enter Your Name Minimum 20 characters";
    else if (form.name.length > 60) WrongInfo.name = "Please Enter Your name Maximum 60 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) WrongInfo.email = "Please Enter Correct Email";

    if (form.address.length === 0) WrongInfo.address = "Please Enter Your Address";
    else if (form.address.length > 400) WrongInfo.address = "Please Enter Your Address Maximum 400 characters";

    if (form.password.length < 8 || form.password.length > 16) {
      WrongInfo.password = "Please Enter Your Password Range In 8-16 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      WrongInfo.password = "Please Enter In Password Minimum 1 Uppercase letter";
    } else if (!/[!@#$%^&*]/.test(form.password)) {
      WrongInfo.password = "Please Enter In Password Minimum 1 Special character";
    }

    setErrors(WrongInfo);
    return Object.keys(WrongInfo).length === 0;
  };

  const InfoChecking = (IC) => {
    IC.preventDefault();
    if (CorrectData()) {
      console.log("Submit Data:", form);
      alert(`Welcome ${form.name}! You have successfully created your account in Store Rating App!`);
      onSuccess(); // <-- FAKT HI 1 LINE ADD KELI
    }
  };

  return (
    <div className="Register-container">
      <div className="Register-card">
        <h2>Create Your Account</h2>
        <p>Store Rating App - Normal User Registration</p>
        <form onSubmit={InfoChecking}>
          <label>Name (20-60 chars)</label>
          <input type="text" name="name" placeholder="Ex: Gayatri Ravikumar Joshi..." value={form.name} onChange={DataSave} />
          {errors.name && <span className="Wrong">{errors.name}</span>}
          <small>{form.name.length}/60</small>

          <label>Email</label>
          <input type="email" name="email" placeholder="gaytrirjoshi@gmail.com" value={form.email} onChange={DataSave} />
          {errors.email && <span className="Wrong">{errors.email}</span>}

          <label>Address (Max 400 chars)</label>
          <textarea name="address" placeholder="Pune, Maharashtra" value={form.address} onChange={DataSave} />
          {errors.address && <span className="Wrong">{errors.address}</span>}
          <small>{form.address.length}/400</small>

          <label>Password (8-16 chars)</label>
          <input type="password" name="password" placeholder="Ex: Gayatri@123" value={form.password} onChange={DataSave} />
          {errors.password && <span className="Wrong">{errors.password}</span>}

          <button type="submit">Register</button>
        </form>
        <p className="login-link">Already You hava Registered Person? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default UserData;