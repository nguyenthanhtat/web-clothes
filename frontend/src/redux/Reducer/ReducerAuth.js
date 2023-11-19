import * as types from "../ActionTypes"
const initialState = {
    loading: false,
    error:null,
    logout:false,
    auth:[],
    refreshToken:null,
    logout: false,
    authRegister: [],
    refreshTokens: [],
    profile:[],
    product:[],
    customer:{}
}
const AuthReducer = (state=initialState,action)=>{
    switch (action.type) {
        case types.REGISTER_API_START:
        case types.LOGIN_API_START:
        case types.REFRESH_TOKEN_START:
        case types.GET_PROFILE_START:
        case types.LOGOUT_API_START:
        return{
            ...state,
            loading:true,

        };
        case types.REGISTER_API_SUCCESS:
            return{
                ...state,
                loading:false,
                authRegister:action.payload,
            };
        case types.LOGIN_API_SUCCESS:
            return{
                ...state,
                loading:false,
                auth:action.payload,
            };
        case types.LOGOUT_API_SUCCESS:
            return{
                ...state,
                loading:false,
                logout:false
            };
            case types.REFRESH_TOKEN_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  logout: true,
                  refreshToken: action.payload,
                  refreshTokens: action.payload.accessToken,
                };
        case types.GET_PROFILE_SUCCESS:
            return{
                ...state,
                loading:false,
                profile:action.payload,
            };
        case types.REGISTER_API_FAIL:
        case types.LOGIN_API_FAIL:
        case types.REFRESH_TOKEN_FAIL:
        case types.GET_PROFILE_FAIL:
        case types.LOGOUT_API_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
            case types.GET_PRODUCT_START:
                return{
                    ...state,
                    loading:true,
                }
            case types.GET_PRODUCT_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    product:action.payload,
                }
            case types.GET_PRODUCT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload,
                } 
        case types.CUSTOMER   :
            return {
                ...state,
                customer:action.payload
            }
        default:
            return state;
        

    }
};
export default AuthReducer