import React, { useState } from 'react';
import './Register.css';

function UserLogin({ onSuccess, onGoRegister }) {
  const [LoginPage, setLoginPage] = useState({ email: '', password: '' });
  const [fail, setfail] = useState({});

  const DataSave = (data) => {
    setLoginPage({ ...LoginPage, [data.name]: data.value });
    setfail({ ...fail, [data.name]: '' });
  };

  const InfoChecking = (IC) => {
    IC.preventDefault();
    let WrongInfo = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(LoginPage.email)) {
      WrongInfo.email = "Please Enter Correct Email";
    }
    if (LoginPage.password.length === 0) {
      WrongInfo.password = "Please Enter Correct Password";
    }

    setfail(WrongInfo);
    if (Object.keys(WrongInfo).length === 0) {
      alert(`Login Successful ! Now give Rating to Stores`);
      onSuccess();
    }
  };

  return (
    <div className="Register-container">
      <div className="Register-card">
        <h2>Welcome Back</h2>
        <p>Store Rating App - Login</p>
        <form onSubmit={InfoChecking}>
          <label>Email</label>
          <input type="email" name="email" placeholder="gaytrirjoshi@gmail.com" value={LoginPage.email} onChange={DataSave} />
          {fail.email && <span className="Wrong">{fail.email}</span>}

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter Your Password" value={LoginPage.password} onChange={DataSave} />
          {fail.password && <span className="Wrong">{fail.password}</span>}

          <button type="submit">Login</button>
        </form>
        <p className="login-link">
          New User? <a href="#" onClick={(e) => { e.preventDefault(); onGoRegister(); }}>Create Account</a>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;