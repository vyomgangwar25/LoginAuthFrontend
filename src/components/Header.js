import React, { useContext } from "react";
import "./header.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
 

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  //console.log(logindata);
  const history=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser=async()=>{
    let token = localStorage.getItem("usersdatatoken");
       // console.log(token)
       const res = await fetch("http://localhost:7000/logout",{
        method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept:"application/json"
            },
       })
       const data = await res.json();
        console.log(data);
    if(data.status ===201  )
    {
      console.log("user logout")
        localStorage.removeItem("usersdatatoken");
        setLoginData(false)
       history("/")
     
    }
    else{
        
        console.log("error")
         
    }
 
  }

  const goError=()=>{
    history("*")

  }

  return (
    <>
      <header>
        <nav>
          <h1>Hp Cloud</h1>
          <div className="avtar">
            {logindata.ValidUserOne ? (
              <Avatar
                style={{
                  background: "salmon",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }} onClick={handleClick}
              >
                {logindata?.ValidUserOne?.fname[0]?.toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                style={{ background: "blue" }}
                onClick={handleClick}
              ></Avatar>
            )}
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {logindata.ValidUserOne ? (
              <>
                <MenuItem onClick={()=>{
                  logoutUser()
                handleClose()}}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={()=>{
                  goError()
                  handleClose()
                }}>Profile</MenuItem>
              </>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
// logindata.ValidUserOne? <Avatar style={{background:"blue"}}>{logindata?.ValidUserOne?.fname[0]?.toUpperCaes()}</Avatar> :
//             <Avatar style={{background:"blue"}}> H</Avatar>
