import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';


const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] =useState('');
  const [loading,setLoading] =useState(true);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       const response =await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type' :'application/json'
        },
        body: JSON.stringify({username,email,password})
       })
       const data = await response.json();
       if (response.ok){
        console.log(data)
        setEmail("");
        setPassword("");
        setUsername("");
        alert('Registration Successful!');
        showLoginHandler();
       }
       
    } catch (error) {
      console.error("registration failed",error)
      alert("error")
      
    }
   
    
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            name ='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name ="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;