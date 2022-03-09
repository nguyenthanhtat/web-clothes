import React,{ useState} from 'react'
import { Link } from 'react-router-dom'
import {HeaderStyle} from '../../Style/Header/HeaderStyle'
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import {useDispatch, useSelector} from 'react-redux'
import {LogoutInitiate} from '../../redux/Action/ActionAuth'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {refreshToken,profile} =useSelector((state)=> state.auth);
  // console.log(refreshToken && refreshToken.status,'refreshTokenss');
  console.log(profile,'profile');
  const handleLogout =(e)=>{
    e.preventDefault();
    dispatch(LogoutInitiate());
    toast.success("Logout")
  }
  return (
    <>
      <HeaderStyle/>
      <div className="header">
        <div className="wrapper">
          <div className="left">
            <span className="language">EN</span>
            <div className='searchContainer'>
              <input className="input" placeholder="Search"/>
              <Search style={{color:'gray',fontSize:16,margin:"2px"}}/>
            </div>

          </div>
          <div className="center">
            <h1 className="logo">LAMA.</h1>
          </div>
          <div className="right">
            {refreshToken && refreshToken.success ?(
                  <div className="dropdown btn-group">
                  <button className="name-button  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Hi, {profile.fullname}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="cart">Paymentssss</Link>
                    <Link className="dropdown-item" to="#" onClick={handleLogout} >Logout</Link>
                  </div>
                </div>
            ):(
              <>
            <Link to='/register' className="menuItem">
              REGISTER
            </Link>
            <Link to='/logintest' className="menuItem">
              SIGN IN
            </Link>
              </>
            )}

            <div className="menuItem">
              <Badge onClick={()=>navigate('/cart')}  badgeContent={2} color="primary">
                <ShoppingCartOutlined/>
              </Badge>
            </div>
          </div>

        </div>
        
      </div>
    </>
  )
}

export default Header
