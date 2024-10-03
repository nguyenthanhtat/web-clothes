import React from 'react'
import { useSelector } from 'react-redux';
import { isAuth, signOut } from '../../helpers/auth';
import AdminHome from '../../components/admin/AdminHome';
import UserHome from '../../components/user/UserHome';
import Home from '../Home/Home';

const TheLayout = () => {
    const userActive = useSelector((state) => state.auth.userActive);
    console.log('userActive', userActive)
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