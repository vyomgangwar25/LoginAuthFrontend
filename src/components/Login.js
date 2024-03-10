import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./mix.css"
const Login = () => {

    const[passShow,setPassShow]=useState(false);

    const [inpval, setInpval] = useState({ 
        email: "",
        password: "",
        
      });
     // console.log(inpval);
     const history=useNavigate();

      const setval=(e)=>{
        const{name,value}=e.target;
        setInpval(()=>{
            return{
                ...inpval,
                [name]:value
            }
        })

      }


      const loginuser=async(e)=>{
        e.preventDefault();
        const{email,password}=inpval;
        if (email === "") {
            alert("email is required!");
          }
          else if (password === "") {
            alert("password is required!");
          }
          else if (password.length < 6) {
            alert("password must be 6 char!");
          }
          else {
            const data = await fetch("http://localhost:7000/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email, password
              })
            });
            const res = await data.json();
            console.log("Response:", res);
            if(res.status === 201)
            {
               localStorage.setItem("usersdatatoken",res.result.token)
              // setInpval({...inpval,email:"",password:"" })
              history("/dashboard")
            }
            else{
              alert("Invalid user")
            }
          }
      }
  return (
    <>
     <section>
            <div className='form_data'>
                <div className='form_heading'>
                    <h1>Welocome back,Log In</h1>
                    <p>Hi,we are glad you are back.Please login</p>
                </div>
    
                <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <div className='two'>
                            <input type="email"  name="email" id="email" value={inpval.email} onChange={setval} placeholder='Enter Your Email Address' />
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type= {!passShow ? "password":"text"}   name="password" id="password" value={inpval.password} onChange={setval} placeholder='Enter Your password' />
                                 <div className="showpass" onClick={()=>{
                                    setPassShow(!passShow)
                                 }} >
                                   {!passShow?"Show" : "Hide"}
                                </div> 
                            </div>
                        </div>

                        <button className='btn'  onClick={loginuser} >Login</button>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink></p>
                    </form>
                     
                </div>
            </section>
    </>
  )
}

export default Login
