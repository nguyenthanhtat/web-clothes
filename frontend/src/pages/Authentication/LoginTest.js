import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginTests } from "../../Style/Authentication/LoginTest";
import { useDispatch, useSelector } from "react-redux";
import { loginInitiate, clearErrors } from "../../redux/Action/ActionAuth";
import { toast } from "react-toastify";
const LoginTest = () => {
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
  console.log(isLock, "lock");
  const { auth } = useSelector((state) => state.auth);
  const handleSubmitForm = (data) => {
    const { email, password } = data;
    dispatch(loginInitiate({ email, password }));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.success === true) {
      window.location.href = "/";
      localStorage.setItem("firstLogin", true);
    }
    if (auth.success === false) {
      toast.error(`${auth.msg}`);
      dispatch(clearErrors());
    }
  }, [auth]);
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

export default LoginTest;
