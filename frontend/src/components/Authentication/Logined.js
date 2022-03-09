import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthenticationStyle } from "../../Style/Authentication/AuthenticationStyle";
import { useNavigate } from "react-router-dom";
import { MetaData } from "../../imports/index";
import { logo } from "../../imports/image";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginInitiate, clearErrors,
} from "../../redux/Action/ActionAuth";
import { toast } from "react-toastify";
import LoadingSmall from "../../pages/Loading/LoadingSmall";
const Logined = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const passwords = useRef({});
  passwords.current = watch("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLock, setIsLock] = useState(false);
  const { auth, loading } = useSelector((state) => state.auth);
  const Auth = auth;
  const handleSubmitForm = (data) => {
    const { email, password } = data;
    console.log(data)
    dispatch(loginInitiate({email, password}));
  };
  const handleIsLock = () => {
    setIsLock(!isLock);
  };
  useEffect(() => {
    if (auth.success === true) {
      window.location.href = "/";
      localStorage.setItem("firstLogin", true);
      dispatch(clearErrors());
    }
    if (auth.success === false) {
      toast.error(`${auth.msg}`);
      dispatch(clearErrors());
    }
  }, [Auth]);
  return (
   <>
      <AuthenticationStyle />
      <MetaData title="Login-Movie" />
      <div className="login">
        <div className="top">
          <div className="wrapper">
            <img className="logo" src={logo} alt="" />
          </div>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h1>Sign In</h1>
            <input
              type="email"
              placeholder="Email or phone number"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              })}
              type="email"
              name="email"
              id="email"
            />
            <span style={{ color: "red" }}>
              {errors.email?.type === "required" &&
                "Mời bạn nhập Email đầy đủ! "}
              {errors?.email?.type === "pattern" &&
                "Email của ban không hợp lệ!"}
            </span>
            <input
              type={isLock ? "type" : "password"}
              {...register("password", { required: true })}
              placeholder="Password"
              name="password"
              id="password"
            />
            {isLock ? (
              <i
                className="fa fa-eye-slash"
                onClick={handleIsLock}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <i
                className="fa fa-eye"
                onClick={handleIsLock}
                style={{ cursor: "pointer" }}
              />
            )}

            <span style={{ color: "red" }}>
              {errors.password?.type === "required" &&
                "Mời bạn nhập đầy đủ mật khẩu. "}
            </span>
    
              <button className="loginButton">Sign In</button>
         
            <span>
              New to Netflix ? &nbsp;
              <b
                onClick={() => navigate("/signup")}
                style={{ cursor: "pointer" }}
              >
                Sign up now
              </b>
              &nbsp; Or &nbsp;
              <b
                onClick={() => navigate("/forget")}
                style={{ cursor: "pointer" }}
              >
                Forget
              </b>
            </span>
            <small>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <b>Learn more</b>.
            </small>
          </form>
        </div>
      </div>
   </>
  )
}

export default Logined