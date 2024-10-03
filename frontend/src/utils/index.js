import cookie from 'js-cookie';

export const removeTokenCookie = () => {
     let tokenOptions = { expires: 1 };
     cookie.remove('token', tokenOptions);
};

export const clearLocal = () => {
     localStorage.clear();
};