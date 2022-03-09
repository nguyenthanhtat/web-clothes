import axios from "axios";
import * as types from "../ActionTypes"
//Register
export const RegisterApiStart =()=>({
    type:types.REGISTER_API_START,
})
export const RegisterApiSuccess =(apis)=>({
    type:types.REGISTER_API_SUCCESS,
    payload:apis,
})
export const RegisterApiFail =(error)=>({
    type:types.REGISTER_API_FAIL,
    payload:error,
})
//Login
export const LoginStart =()=>({
    type:types.LOGIN_API_START,
})
export const LoginSuccess =(api)=>({
    type:types.LOGIN_API_SUCCESS,
    payload:api,
})
export const LoginFail =(error)=>({
    type:types.LOGIN_API_FAIL,
    payload:error,
})
//Login
export const LogoutStart =()=>({
    type:types.LOGOUT_API_START,
})
export const LogoutSuccess =()=>({
    type:types.LOGOUT_API_SUCCESS,
   
})
export const LogoutFail =()=>({
    type:types.LOGOUT_API_FAIL,
    
})
//RefreshToken
export const RefreshTokenStart = () => ({
    type: types.REFRESH_TOKEN_START,
  });
  export const RefreshTokenSuccess = (token) => ({
    type: types.REFRESH_TOKEN_SUCCESS,
    payload: token,
  });
  export const RefreshTokenFail = (error) => ({
    type: types.REFRESH_TOKEN_FAIL,
    payload: error,
  });
//profile
export const GetProfileStart =()=>({
    type:types.GET_PROFILE_START,
})
export const GetProfileSuccess =(token)=>({
    type:types.GET_PROFILE_SUCCESS,
    payload:token,
})
export const GetProfileFail =(error)=>({
    type:types.GET_PROFILE_FAIL,
    payload:error,
})

export const RegisterInitiate =(
    fullname,email,password
)=>{
    return async function(dispatch){
        dispatch(RegisterApiStart());
        await axios
        .post("/api/auth/customer/register",{
            fullname,email,password
        })
        .then((user)=>{
            dispatch(RegisterApiSuccess(user.data));

        })
        .catch((error)=>{
            dispatch(RegisterApiFail(error));
        });
    };
};
export const loginInitiate = ({email, password}) => async (dispatch) => {
    console.log(email, password,'tientai');
    try {
      dispatch(LoginStart());
  
      const { data } = await axios.post(`/api/auth/customer/login`, {
        email,
        password,
      });
  
      dispatch(LoginSuccess(data));
    } catch (error) {
      dispatch(LoginFail(error));
    }
  };
  // //!Logout
export const LogoutInitiate = () => async (dispatch) => {
  try {
    dispatch(LogoutStart());

    await axios.get(`/api/auth/customer/logout`);
    dispatch(
      LogoutSuccess(
        localStorage.removeItem("firstLogin"),
        (window.location.href = "/logintest")
      )
    );
  } catch (error) {
    dispatch(LoginFail(error));
  }
};
//RefreshToken
export const RefreshTokenInitiate = (token) => async (dispatch) => {
    try {
      dispatch(RefreshTokenStart());
  
      const { data } = await axios.get(`/api/auth/customer/refresh_token`, {
        headers: { Authorization: ` ${token}` },
        //tat dau buôi
      });
  
      dispatch(RefreshTokenSuccess(data));
    } catch (error) {
      dispatch(RefreshTokenFail(error));
    }
  };
//profile
export const GetProfileInitiate =(token)=> async(dispatch)=>{
    try{
        dispatch(GetProfileStart());
        const {data} = await axios.get(`/api/auth/customer/profile`,{
            headers:{Authorization:`${token}`},
        });
        dispatch(GetProfileSuccess(data.user));

    }catch(error){
        dispatch(GetProfileFail(error));
    }
}
//!CLEAR_ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: types.CLEAR_ERRORS_SUCCESS });
  };