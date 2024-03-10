import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setval = (e) => {
    const { name, value } = e.target;
    // console.log(name,value);
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };
  const history=useNavigate();
  const addUserdata = async(e) => {
    e.preventDefault();

    const { fname, email, password, cpassword } = inpval;
    if (fname === "") {
      alert("fname is required!");
    } else if (email === "") {
      alert("email is required!");
    } else if (!email.includes("@")) {
      alert("enter valid email");
    } else if (password === "") {
      alert("password is required!");
    } else if (password.length < 6) {
      alert("password must be 6 char!");
    } else if (cpassword === "") {
      alert("cpassword is required!");
    } else if (cpassword.length < 6) {
      alert("confirm password must be 6 char!");
    } else if (password !== cpassword) {
      alert("pass and Cpass are not matching!");
    } else {
      // console.log("registration done ");
       
        const data = await fetch("http://localhost:7000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fname, email, password, cpassword
          })
        });
      
       const res = await data.json();
      //console.log("Response:", res);
      if(res.status === 201)
      {
        alert("User Successfully Registered");
        setInpval({...inpval,fname:"",email:"",password:"",cpassword:""})
        history("/")
      }
      }  
      
      
    }
 ;

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.
            </p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <div className="two">
                <input
                  type="text"
                  onChange={setval}
                  value={inpval.fname}
                  name="fname"
                  id="fname"
                  placeholder="Enter Your Name"
                />
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <div className="two">
                <input
                  type="email"
                  onChange={setval}
                  value={inpval.email}
                  name="email"
                  id="email"
                  placeholder="Enter Your Email Address"
                />
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setval}
                  value={inpval.password}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => {
                    setPassShow(!passShow);
                  }}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  onChange={setval}
                  value={inpval.cpassword}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => {
                    setCPassShow(!cpassShow);
                  }}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={addUserdata}>
              Sign Up
            </button>
            <p>
              Already have an account? <NavLink to="/">Log In</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
