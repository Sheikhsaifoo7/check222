// import React, { useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { LoginContext } from './Contextprovider/Context';

// const Dashboard = () => {
//     const {logindata,setLoginData}=useContext(LoginContext);
//     // console.log(logindata.validUserOne.email);
//     const history=useNavigate();
//     const DashboardValid=async()=>{
//         let token=localStorage.getItem("userdatatoken")
//         // console.log(token)
//         try {
//           const res=await fetch("http://localhost:5000/validuser",{
//             method:"GET",
//             headers:{
//               "Content-Type":"application/json",
//               "Authorization":token
//             }
//           })
//           const data=await res.json();
//           if(data.status===401 || !data){
//             history("*")
//           }else{
//             console.log("user verify")
//             setLoginData(data)
//             history("/dash")
//           }
//           // console.log(data);
//         } catch (error) {
          
//         }
//     }
//     useEffect(()=>{
//         DashboardValid();
//     },[])

//   return (
//     <>
//       <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
//         <img src='./man.png' style={{width:"200px",marginTop:20}} alt=''/>
//   <h1>User Email:{logindata? logindata.validUserOne.email :""}</h1>
//       </div>
//     </>
//   )
// }

// export default Dashboard



import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./Contextprovider/Context";

const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("userdatatoken");

    try {
      const res = await fetch("http://localhost:5000/validuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await res.json();

      if (data.status === 401 || !data) {
        history("*");
      } else {
        console.log("User verified");
        setLoginData(data);
        history("/dash");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />

        {/* ✅ Conditional Rendering Fix */}
        {logindata && logindata.validUserOne ? (
          <h1>User Email: {logindata.validUserOne.email}</h1>
        ) : (
          <h1>Loading...</h1> // Display a loading message before data is available
        )}
      </div>
    </>
  );
};

export default Dashboard;
