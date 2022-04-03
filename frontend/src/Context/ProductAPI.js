import React,{ useState,useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { GetAllProductInitiate } from '../redux/Action/ActionProduct'
const ProductAPI = (token,callback) => {
    const [call, setCall] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (token && token.length > 0) {
          dispatch(GetAllProductInitiate(token));
        }
      }, [token,callback]);
    return {
      call: [call, setCall],
    };
  };

export default ProductAPI