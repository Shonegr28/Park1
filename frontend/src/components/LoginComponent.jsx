import React, { useState } from 'react';
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";


const LoginComponent = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/login", {email, password}) // send post-request to this url passing form-data, this url port is specified in index.js listen()
    .then(result => {  // if request is succesful then route them to login page
      console.log(result);
      if (result.data === "succesfully logged in user") { // check response, then navigate to home
        navigate("/");
      }
      
    })
    .catch(err => {
      if (err.response && err.response.status === 400) {
        setError("Incorrect email/password or user doesn't exist");
      } else {
        setError("An error occurred, please try again.");
      }
    });
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

        <h1 style={{ color: 'black',fontWeight: 'bold',fontSize:20 }}>Login</h1>
        
        {error && <p style={{ color: 'blue' }}>{error}</p>}
      
        
        <label style={{ color: 'black' }}>Email</label>
        <input type="email" placeholder="enter email" onChange={(e) => setEmail(e.target.value)}/>
        
        
        <label style={{ color: 'black' }}>Password</label>
        <input type="password" placeholder="enter password" onChange={(e) => setPassword(e.target.value)}/>
        
        
        <button type="submit" style={{ color: 'black',fontWeight: 'bold', }}>Login In</button>
        
        
        <p className= "text-sm text-center mt-4"> Don't have an account?{" "}<Link to = "/Register" className=''> Create an Account </Link> </p>
      </form>
  
      
         
    </div>
  )
}

export default LoginComponent

