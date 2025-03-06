import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isAuth, signOut } from '../../helpers/auth';
import AdminHome from '../../components/admin/AdminHome';
import UserHome from '../../components/user/UserHome';
import Home from '../Home/Home';
import cookie from 'js-cookie';
import axios from "axios";
import { setActiveAccount } from '../../redux/Action/ActionAuth';
import { useNavigate } from 'react-router-dom';
const TheLayout = () => {
    const userActive = useSelector((state) => state.auth.userActive);
     const dispatch = useDispatch()
     const navigate = useNavigate()
    const fetchUserInfo = () =>{
          const token = cookie.get('token');
          axios.get(`http://localhost:5000/api/auth/customer/account`, {headers:{token}}).then((res)=>{
          if(res.data.status === 200){
            dispatch(setActiveAccount(res.data.user))
          } else {
               navigate('/login');
          }
        })
     }

    useEffect(fetchUserInfo, []);
     const LayoutComponent = (user) => {
      let content = '';
      console.log('user.role', user.role)
      switch (user.role) {
           case 'admin':
                content = <AdminHome />;
                break;
           case 'user':
                content = <Home />;
                break;
           default:
                content = (
                     <div className="page-loading-container">
                          {/* <CSpinner color="primary" /> */}
                     </div>
                );
                break;
      }
      return content;
 };
 console.log('isAuth()', isAuth())
  return (
    <>
        {isAuth() ? (
            <>{LayoutComponent(userActive)}</>
        ) : (
            <>{signOut()}</>
          )}
    </>
  )
}

export default TheLayout