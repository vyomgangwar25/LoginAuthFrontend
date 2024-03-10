import React, { useContext, useEffect } from 'react'
import vimg from "../images/vyom.jpeg"
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './ContextProvider/Context'
const Dashboard = () => {

  const {logindata,setLoginData}=useContext(LoginContext)
  //console.log(logindata )

  const history=useNavigate();

    const Dashboard = async()=>{
        let token = localStorage.getItem("usersdatatoken");
       // console.log(token)
       const res = await fetch("http://localhost:7000/validUser",{
        method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
       })
       const data = await res.json();
    //    console.log(data);
    if(data.status === 401 || !data)
    {
        console.log("error page redirect")
       history("*")
    }
    else{
        console.log("user verify")
        setLoginData(data)
       history("/dashboard")
    }
    }

    useEffect(()=>{
     Dashboard();
    },[])

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
       <img src= {vimg} style={{ width: "200px", marginTop: 20, borderRadius: "10px" }} alt="" />
      <h1>User Email:{logindata? logindata.ValidUserOne?.email : ""}</h1>
       </div> 
    </>
  )
}

export default Dashboard
