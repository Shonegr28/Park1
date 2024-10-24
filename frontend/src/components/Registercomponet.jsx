import React, { useState } from 'react';
import './RegisterComponent.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";


const RegisterComponent = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  console.log("cur-name: "+name);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/register", {name, email, password}) // send post-request to this url passing form-data, this url port is specified in index.js listen()
    .then(result => {  // if request is succesful then route them to login page
      console.log(result);
      navigate("/login");

    })
    .catch(err => {
      if (err.response && err.response.status === 400) {
        setError("Email already exists, please use a different email.");
      } else {
        setError("An error occurred, please try again.");
      }
    });
  }

  return (
    <div className="container"> 
      <form onSubmit={handleSubmit}>
    
        <h1 style={{ color: 'black', fontWeight: 'bold',fontSize:20 }}>Register</h1>
        {error && <p style={{ color: 'blue' }}>{error}</p>}

        
        <label style={{ color: 'black' }}>Name</label>
        <input type="text" placeholder="enter name" onChange={(e) => setName(e.target.value)} />
        
        
        <label style={{ color: 'black' }}>Email</label>
        <input type="email" placeholder="enter email" onChange={(e) => setEmail(e.target.value)}/>
        
        
        <label style={{ color: 'black' }}>Password</label>
        <input type="password" placeholder="enter password" onChange={(e) => setPassword(e.target.value)}/>
        
        
        {/* Submmit button */}
        <button type="create" style={{ color: 'black', fontWeight: 'bold'}}>Create Account</button>
        




        <p className= "text-sm text-center mt-4"> Have account?{" "}<Link to = "/login" className=''> LOGIN </Link> </p>
      </form>
    </div>
  );
}

export default RegisterComponent;
