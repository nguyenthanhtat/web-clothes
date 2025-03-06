import cookie from 'js-cookie';
import { toast } from 'react-toastify';

export const removeTokenCookie = () => {
     let tokenOptions = { expires: 1 };
     cookie.remove('token', tokenOptions);
};

export const clearLocal = () => {
     localStorage.clear();
};

export const toastError = (response, options) => {
     console.log('response', response)
     const message = response.data.message || response.data.error || response.data.msg;
     console.log('message', message)
     toast.error(message, options);
};