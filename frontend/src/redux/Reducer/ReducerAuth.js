import { SET_ACTIVE_ACCOUNT } from "../ActionTypes";

const initialState = {
    loading: false,
    error: null,
    logout: false,
    auth: [],
    refreshToken: null,
    logout: false,
    authRegister: [],
    refreshTokens: [],
    profile: [],
    product: [],
    customer: {},
    userActive: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
         case SET_ACTIVE_ACCOUNT:
              return { ...state, userActive: action.payload };

         default:
              return state;
    }
};