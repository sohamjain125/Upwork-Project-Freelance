import React, { useState } from 'react';
import styles from './styles.module.css';
import Loading from "../../components/loading";
import Button from "../../components/button";
function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    // You might want to perform validation and make an API call to register the user.
    // Example: send formData to your backend API
    console.log(formData);
  };

  return (
    <div>
      <Loading />
      <img src="/assets/img/bg.jpg" alt="background"/>
     
    <div className={styles.externalSection}>
      <h1 className={styles.title}>Registration Page</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className={styles.inputsContainer}>
          <label htmlFor="username"></label>
          <input className='form-control'
          placeholder='Username'
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputsContainer}>
          <label htmlFor="email"></label>
          <input className='form-control'
          placeholder='Email'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputsContainer}>
          <label htmlFor="password"></label>
          <input className='form-control'
          placeholder='Password'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputsContainer}>
          <label htmlFor="confirmPassword"></label>
          <input className='form-control'
          placeholder='Confirm Password'
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <Button type="primary" label="Register" onClick={() => alert("ahp me")} />
        <hr />
        <div className={styles.flexSpaceBetween}>
            <p>
                Thank you and enjoy our website.<br/>
                <strong>Your Authentication Team</strong>
            </p>
            <img alt="logo" className={styles.smallLogo} src="https://technext.github.io/guruable/assets/images/auth/Logo-small-bottom.png" />
        </div>
      </form>
    </div>
    </div>
  );
}

export default RegistrationPage;
