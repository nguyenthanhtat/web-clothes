import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProfileInitiate } from "../redux/Action/ActionAuth";
const UserAPI = (token) => {
    const dispatch = useDispatch();
    useEffect(() => {
      if (token && token.length > 0) {
        dispatch(GetProfileInitiate(token));
      }
    }, [token]);
  console.log(token,"token")
    return {};
  };
  export default UserAPI;