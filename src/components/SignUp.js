import React, {useEffect, useState} from 'react'
import logo from "../img/logo.png"
import "./SignUp.css";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //toast functions


  const postData = ()=>{
    //sending data to server

    fetch("http://localhost:5000/signup", {
      method: "post", 
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        userName:userName,
        password:password
      })
    }).then(res=>res.json())
      .then(data =>{console.log(data)})
  }

  return (
    <div className='signUp'>
      <div className='form-container'>
        <div className='form'>
          <img className='signUpLogo' src={logo} alt=''/>
          <p className='loginPara'>
              Sign up to see photos and videos <br/> from your friends
          </p>
          <div>
              <input type='email' name='email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/>
          </div>
          <div>
              <input type='text' name='name' id='name' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Full Name'/>
          </div>
          <div>
              <input type='text' name='username' id='username' value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder='Username'/>
          </div>
          <div>
              <input type='password' name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
          </div>
          <p className='loginPara' style={{fontSize:"12px", margin:"3px 0px"}}>
              By siging up, you agree to our Terms, <br/> privacy policy and cookies policy
          </p>
          <input type='submit' id='submit-btn' value='Sign Up' onClick={()=>{postData()}} />
        </div>

        <div className='form2'>Already have an account?
          <Link to="/signin">
          <span style={{color:"blue", cursor:"pointer"}}>Sign In</span></Link>
        
        </div>
        
      </div>

    </div>
  )
}
