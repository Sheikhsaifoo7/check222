import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./mix.css";

const Register = () => {

    const [passShow, setPassShow] = useState(false);
    const [passShow2,setPassShow2]=useState(false);
    const [inpVal,setInpVal]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:""

    });
// console.log(inpVal)

    const setVal=(e)=>{
        // console.log(e.target.value)
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
        const {name,email,password,cpassword}=inpVal;

        if(name===""){
            alert("please enter your name");
        }else if(email===""){
            alert("please enter your email")
        }else if(!email.includes('@')){
            alert("please enter valid email")
        }else if(password===""){
            alert("please enter your password")
        }else if(password.length < 6){
            alert("password must be 6 char")
        }else if(cpassword===""){
            alert("enter your confirm password")
        }else if(cpassword.length < 6){
            alert("password must be 6 char")
        }else if(password !== cpassword){
            alert("password and confirm password not match")
        }
        else{
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name,email,password,cpassword }),
                });
        
                const data = await response.json();
                console.log('Response data:', data.status);
                if(data.status===201){
                    alert("User Registration Succesfully!")
                    setInpVal({...inpVal,name:"",email:"",password:"",cpassword:""})
                }
            } catch (error) {
                console.error('Failed to fetch:', error.message);
            }
        }
    }

    return (
        <div>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back,Register</h1>
                        <p style={{textAlign:'center'}}>We are glad  that you will be using project cloud to manage<br/>your task! 
                        we hope that you will get like it
                        </p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' value={inpVal.email}  onChange={setVal} placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Name</label>
                            <input type="name" name='name' id='name' value={inpVal.name} onChange={setVal} placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} name='password' onChange={setVal} id='password' value={inpVal.password} placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => { setPassShow(!passShow) }}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!passShow2 ? "password" : "text"} name='cpassword' onChange={setVal} value={inpVal.cpassword} id='password' placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => { setPassShow2(!passShow2) }}>
                                    {!passShow2 ? "Show" : "Hide"}
                                </div>
                            </div>
                            </div>
                        
                        <button className='btn' onClick={addUserData}>Sign Up</button>
                        <p>Already have an account!<NavLink to="/">Log in</NavLink></p>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Register