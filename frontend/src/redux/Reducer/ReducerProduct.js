import * as types from '../ActionTypes'
const initialState ={
    loading: false,
    error:null,
    product:[],
    productDetails:[],
}
const AdminProductReducer = (state = initialState, action) =>{
    switch (action.type){
        //getallproduct
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
        //productdetails
        case types.GET_ONE_PRODUCT_START:
            return{
                ...state,
                loading:true,
            }
        case types.GET_ONE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,
                productDetails:action.payload,
            }
        case types.GET_ONE_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        default:
            return state;
    }
}
export default AdminProductReducer