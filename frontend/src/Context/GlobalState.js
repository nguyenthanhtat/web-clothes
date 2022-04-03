import React,{createContext,useState,useEffect} from 'react'
import {useDispatch,useSelector,} from 'react-redux'
import {RefreshTokenInitiate} from "../redux/Action/ActionAuth";
import UserAPI from "./UserAPI";
import ProductAPI from './ProductAPI';

export const GlobalState = createContext();
export const DataProVider = ({children})=>{
    const [callback,setCallback] = useState(false);
    const {auth,refreshTokens} = useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin){
            const refreshToken = async()=>{
                dispatch(RefreshTokenInitiate(auth.accessToken));
                setTimeout(()=>{
                    refreshToken();
                },10*60*1000)
            }
            refreshToken();
 
        }

    },[callback])
    const data={
        callback:[callback,setCallback],
        UserAPI:UserAPI(refreshTokens),
        ProductAPI:ProductAPI(refreshTokens),
    };
    return <GlobalState.Provider value={data}>{children}</GlobalState.Provider>
};