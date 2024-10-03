import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";
import { loginInitiate, setActiveAccount } from "../../redux/Action/ActionAuth";
import { LoginTests } from "../../Style/Authentication/LoginTest";
import axios from "axios";
import { authenticate } from "../../helpers/auth";
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const passwords = useRef({});
  passwords.current = watch("password");
  const [isLock, setIsLock] = useState(false);
  const handleIsLock = () => {
    setIsLock(!isLock);
  };
  const { auth, userActive } = useSelector((state) => state.auth);
  const test = useSelector((state) => state.auth.userActive);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async( data) => {
    const { email, password } = data;
    await axios.post(`http://localhost:5000/api/auth/customer/login`, {
      email,
      password,
    }).then((res)=>{
      if(res.data.status === 200){
        authenticate(res);
        console.log('res', res)
        dispatch(setActiveAccount(res.data.user))
        navigate('/');
      }
    })
  };

  return (
    <>
      <LoginTests />
      <div className="container">
        <div className="wrapper">
          <h1 className="title">SIGN IN</h1>
          <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <input
              className="input"
              placeholder="username"
              type="email"
              name="email"
              id="email"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              })}
            />
            <span style={{ color: "red" }}>
              {errors.email?.type === "required" &&
                "Mời bạn nhập Email đầy đủ! "}
              {errors?.email?.type === "pattern" &&
                "Email của ban không hợp lệ!"}
            </span>
            <div className="passwordContainer">
              <input
                type={isLock ? "type" : "password"}
                {...register("password", { required: true })}
                className="input"
                placeholder="password"
                name="password"
                id="password"
              />
              {isLock ? (
                <i className="fa fa-eye-slash icon" onClick={handleIsLock} />
              ) : (
                <i className="fa fa-eye icon" onClick={handleIsLock} />
              )}
              <span style={{ color: "red" }}>
                {errors.password?.type === "required" &&
                  "Mời bạn nhập đầy đủ mật khẩu. "}
              </span>
            </div>
            <button className="btn">LOGIN</button>
            <Link to="/register" className="forgot">
              DO NOT YOU REMEMBER THE PASSWORD{" "}
            </Link>
            <Link to="/register" className="create">
              CREATE A NEW ACCOUNT
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
