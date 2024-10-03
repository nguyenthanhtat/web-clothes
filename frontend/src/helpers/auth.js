import cookie from 'js-cookie';
import { clearLocal, removeTokenCookie } from '../utils';
export const isAuth = () => {
     const isAuth = false;
     if (window !== 'undefined') {
          const cookieChecked = cookie.get('token');
          console.log('cookieChecked', cookieChecked)
          if (cookieChecked) {
               return true;
          }
     }
     return isAuth
};
export const authenticate = (response, next = f => f) => {
     const { token, user } = response.data;
     console.log('token, user', token, user)
     let tokenOptions = { expires: 1 };
     cookie.set('token', token, tokenOptions);
     if (user) {
          localStorage.setItem('user', JSON.stringify(user));
     }
     next();
};
export const signOut = (sessionExpired) => {
     console.log('first')
     removeTokenCookie();
     clearLocal();
     window.location.replace("/login");
};