import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import "./header.css"
import { LoginContext } from './Contextprovider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata)
  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("userdatatoken")
    try {
      const res = await fetch("http://localhost:5000/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "token",
          Accept: "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      if (data.status == 201) {
        console.log("user logout")
        localStorage.removeItem("userdatatoken")
        setLoginData(false)
        history("/")  
      } else {
        console.log("error")
      }
    } catch (error) {

    }
  }


  const goerror = () => {
    history("*")
  }
  const godash = () => {
    history("/dash")
  }


  return (
    <div>
      <header>
        <nav><h1>Hp Cloud</h1>
          <div className='avtar'>
            {
              logindata.validUserOne ? <Avatar style={{ background: "black", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick} >{logindata.validUserOne.name[0].toUpperCase()}</Avatar>
                : <Avatar style={{ background: "blue" }} onClick={handleClick} />
            }

          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            {
              logindata.validUserOne ? (
                <>
                  <MenuItem onClick={() => {
                    godash()
                    handleClose()
                  }}>Profile</MenuItem>
                  <MenuItem onClick={() => {
                    logoutuser()
                    handleClose()
                  }}>Logout</MenuItem>
                </>
              ) :
                (
                  <>
                    <MenuItem onClick={() => {
                      goerror()
                      handleClose()
                    }}>Profile</MenuItem>
                  </>
                )
            }




          </Menu>

        </nav>
      </header>
    </div>
  )
}

export default Header
