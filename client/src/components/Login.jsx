import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./mix.css";

const Login = () => {
  const history=useNavigate();

  const [passShow,setPassShow]=useState(false);
  const [inpVal,setInpVal]=useState({
    email:"",
    password:""
  })
console.log(inpVal)
  const setVal=(e)=>{
    // console.log(e.target.value);
    const {name,value}=e.target;
    setInpVal(()=>{
      return{
        ...inpVal,
        [name]:value
      }
    })
  }
  
  const addUserData= async(e)=>{
    e.preventDefault();
    const {email,password}=inpVal;
    if(email===""){
      alert("enter your email");
    }
    else if(!email.includes('@')){
      alert("enter valid email")
    }
    else if(password===""){
      alert("enter your password")
    }
    else if(password.length<6)
    {
      alert("password must be 6 char")
    }
    else{
      try {
        const data= await fetch("http://localhost:5000/login",{
          method:"POST",
          headers:{
              "Content-Type":"application/json",
          },
          body:JSON.stringify({
            email,password
          }),

        })
        const res=await data.json();
        console.log(res)
        if(res.status===201){
          localStorage.setItem("userdatatoken",res.result.token)
          history("/dash")
          setInpVal({...inpVal,email:"",password:""})
        }
      } catch (error) {
        
      }
    }

  }

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back,Log In</h1>
            <p>Hi,we are you glad you are back.Please Login. </p>
          </div>

        <form>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={setVal} value={inpVal.email} id='email'placeholder='Enter Your Email Address' />
          </div>
          <div className="form_input">
            <label htmlFor="password">password</label>
            <div className="two">
            <input type={!passShow ? "password":"text"} name='password' value={inpVal.password} onChange={setVal} id='password'placeholder='Enter Your Password' />
            <div className="showpass" onClick={()=>{setPassShow(!passShow)}}>
              {!passShow ?"Show":"Hide"}
            </div>
            </div>
           
          </div>
          <button className='btn' onClick={addUserData}>Login</button>
          <p>Don't have an account?<NavLink to="/register">Sign In</NavLink></p>
        </form>
        </div>
      </section>
    </div>
  )
}

export default Login