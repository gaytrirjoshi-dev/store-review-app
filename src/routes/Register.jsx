import React, { useState } from 'react';
import './Register.css';

function UserData({ onSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', password: '',  role: 'user',
  storename: ''  });
  const [errors, setErrors] = useState({});

  const DataSave = (data) => {
    setFormData({ ...formData, [data.target.name]: data.target.value });
    setErrors({ ...errors, [data.target.name]: '' });
  };

  const CorrectData = () => {
    let WrongInfo = {};
    
    if (formData.name.length < 20) WrongInfo.name = "Please Enter Your Name Minimum 20 characters";
    else if (formData.name.length > 60) WrongInfo.name = "Please Enter Your name Maximum 60 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) WrongInfo.email = "Please Enter Correct Email";

    if (formData.address.length === 0) WrongInfo.address = "Please Enter Your Address";
    else if (formData.address.length > 400) WrongInfo.address = "Please Enter Your Address Maximum 400 characters";

    if (formData.password.length < 8 || formData.password.length > 16) {
      WrongInfo.password = "Please Enter Your Password Range In 8-16 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      WrongInfo.password = "Please Enter In Password Minimum 1 Uppercase letter";
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      WrongInfo.password = "Please Enter In Password Minimum 1 Special character";
    }

    setErrors(WrongInfo);
    return Object.keys(WrongInfo).length === 0;
  };

  const InfoChecking = (IC) => {
    IC.preventDefault();
    if (CorrectData()) {
      console.log("Submit Data:", formData);
      alert(`Welcome ${formData.name}! You have successfully created your account in Store Rating App!`);
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
          <input type="text" name="name" placeholder="Ex: Gayatri Ravikumar Joshi..." value={formData.name} onChange={DataSave} />
          {errors.name && <span className="Wrong">{errors.name}</span>}
          <small>{formData.name.length}/60</small>

          <label>Email</label>
          <input type="email" name="email" placeholder="gaytrirjoshi@gmail.com" value={formData.email} onChange={DataSave} />
          {errors.email && <span className="Wrong">{errors.email}</span>}

          <label>Address (Max 400 chars)</label>
          <textarea name="address" placeholder="Pune, Maharashtra" value={formData.address} onChange={DataSave} />
          {errors.address && <span className="Wrong">{errors.address}</span>}
          <small>{formData.address.length}/400</small>

          <label>Password (8-16 chars)</label>
          <input type="password" name="password" placeholder="Ex: Gayatri@123" value={formData.password} onChange={DataSave} />
           {errors.password && <span className="Wrong">{errors.password}</span>}

          <label>Who are you?</label>
          <div style={{ display: "flex", gap: "15px" }}>
          <label>
          <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={DataSave} /> Normal User
         </label>
           <label>
           <input type="radio" name="role" value="owner" checked={formData.role === 'owner'} onChange={DataSave} /> Store Owner
           </label>
           </div>

          {formData.role === 'owner' && (
           <>
          <label>Please Select your Store name</label>
         <input type="text" name="storename" placeholder="Ex: Sharma Kirana" value={formData.storename} onChange={DataSave} />
           </>
          )}
         

          <button type="submit">Register</button>
        </form>
        <p className="login-link">Already You hava Registered Person? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default UserData;