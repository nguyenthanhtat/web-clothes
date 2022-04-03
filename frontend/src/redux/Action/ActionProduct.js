import axios from 'axios';
import * as types from '../ActionTypes'

export const GetProductStart = ()=>({
    type:types.GET_PRODUCT_START,
})
export const GetProductSuccess = (token)=>({
    type:types.GET_PRODUCT_SUCCESS,
    payload:token,
})
export const GetProductFail = (err)=>({
    type:types.GET_PRODUCT_FAIL,
    payload:err,
})
export const GetOneProductStart = ()=>({
    type:types.GET_ONE_PRODUCT_START,
})
export const GetOneProductSuccess = (token)=>({
    type:types.GET_ONE_PRODUCT_SUCCESS,
    payload:token,
})
export const GetOneProductFail = (err)=>({
    type:types.GET_ONE_PRODUCT_FAIL,
    payload:err,
})

export const GetAllProductInitiate = (token)=>{
    return async function(dispatch){
        try {
            dispatch(GetProductStart());
            const {data} =await axios.get("/api/products/getallproduct",{
                headers:{Authorization:token},
  
            })
            dispatch(GetProductSuccess(data))
        } catch (error) {
            dispatch(GetProductFail(error))
        }
    }
  
  }
export const GetFindProductInitiate = (id)=>{
    return async function(dispatch){
        try {
            dispatch(GetOneProductStart());
            const {data} =await axios.get(`/api/products/find/${id}`)
            dispatch(GetOneProductSuccess(data.others))
        } catch (error) {
            dispatch(GetOneProductFail(error))
        }
    }
  
  }
