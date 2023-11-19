import React, { useState, useRef, useEffect } from 'react'
import { RegisterStyle } from '../../Style/Authentication/RegisterStyle'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { RegisterInitiate, clearErrors, loginGoogleInitiate } from '../../redux/Action/ActionAuth'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    reset,
  } = useForm();
  const passwords = useRef({})
  passwords.current = watch("password")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authRegister, customer, auth } = useSelector((state) => state.auth);
  console.log('customer', customer)
  console.log('auth', auth)
  const handleSubmitForm = (data) => {
    const { email, fullname, password } = data;
    dispatch(RegisterInitiate(fullname, email, password));
  }
  const [isHiddenPassword, setIsHiddenPassword] = useState({
    hiddenPassword: false,
    hiddenCurrentPassword: false
  });
  const handleHiddenPassword = (type) => {
    const newIsHidden = { ...isHiddenPassword }
    if (type === 'password') {
      newIsHidden.hiddenPassword = !newIsHidden.hiddenPassword
    } else {
      newIsHidden.hiddenCurrentPassword = !newIsHidden.hiddenCurrentPassword
    }
    setIsHiddenPassword(newIsHidden)
  };

  // useEffect(() => {
  //   if (customer?.verify) {
  //     navigate("/verify-account")
  //   } else {
  //     navigate("/home")
  //   }
  // }, [customer])
  useEffect(() => {
    if (authRegister.success === true) {
      reset();
      toast.success(`${authRegister.msg}`);
      navigate("/logintest");
      dispatch(clearErrors());

    } else if (authRegister.success === false) {
      toast.error(`${authRegister.msg}`);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authRegister])
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
  }, [auth]);
  const handleLoginGoogle = (credentialResponse) => {
    console.log('credentialResponse', credentialResponse.credential)
    dispatch(loginGoogleInitiate(credentialResponse.credential));
  }
  const handleLoginGoogleFail = (credentialResponse) => {
    return toast.error(credentialResponse);
  }

  return (
    <>
      <RegisterStyle />

      <div className="container">
        <div className="wrapper">
          <h1 className="title">CREATE ACOUNT</h1>
          <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
            {/* <input className="input" placeholder= "name"/>
            <input  className="input" placeholder= "last name"/> */}
            <input className="input" placeholder="fullname"
              {...register("fullname", { required: true, maxLength: 20 })}
              type='text' name='fullname' id='fullname'
            />
            <span style={{ color: "red" }}>
              {errors.fullname?.type === "required" &&
                "Mời bạn nhập đầy đủ tên vào!"}
              {errors?.fullname?.type === "maxLength" &&
                "Tên của bạn không được quá 20 kí tự"}
            </span>
            <br />
            <input className="input" placeholder="email"
              {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i })}
              type='email' name='email' id='email'
            />
            <span style={{ color: 'red' }}>
              {errors.email?.type === 'required' && "Mời Bạn Nhập Đầy Đủ Email"}
              {errors?.email?.type === ' pattern' && "Email Của Bạn Không Hợp Lệ"}
            </span>
            <br />
            <div className="inputContainer">
              <input className="password" placeholder="password"
                {...register('password', {
                  required: true, minLength: {
                    value: 6,
                  }, pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                })}
                type={isHiddenPassword.hiddenPassword ? 'text' : 'password'} name='password' id='password'
              />
              <i className={`${isHiddenPassword.hiddenPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} 'icon'`}
                onClick={() => handleHiddenPassword('password')}
              />
              <span style={{ color: 'red' }}>
                {errors.password?.type === 'required' && "Mời Bạn Nhập Đầy Đủ Mật Khẩu"}
                {errors?.password?.type === 'minLength' && "Mật Khẩu Phải 6 Kí Tự Trở Lên"}
                {errors?.password?.type === 'pattern' && "Mật Khẩu Phải Có Chữ In Hoa,Số,Kí Tự Đặt Biệt"}
              </span>
            </div>
            <br />
            <div className="inputContainer">
              <input className="confirmPassword" placeholder="confirm password"
                {
                ...register("confirmPassword", {
                  required: true, validate: (value) =>
                    value === getValues('password') || "The passwords do not match",
                })
                }
                type={isHiddenPassword.hiddenCurrentPassword ? 'text' : 'password'} name='confirmPassword' id='confirmPassword'
              />
              <i className={`${isHiddenPassword.hiddenCurrentPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} 'icon'`}
                onClick={() => handleHiddenPassword('currentPassword')}
              />
              <span style={{ color: 'red' }}>
                {errors.confirmPassword?.type === 'required' && 'Mời Bạn Nhập Lại Mật Khẩu'}
                {errors.confirmPassword?.type === 'validate' && 'Mật Khẩu Không Khớp'}

              </span>
            </div>
            <br />
            <span className="agreement">By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b></span>
            <GoogleOAuthProvider clientId="457687079616-qtvknignpj5hguka95ljq1h0iff1tba7.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleLoginGoogle}
                onError={handleLoginGoogleFail}
              />
            </GoogleOAuthProvider>
            <button className="btn">CREATE</button>

          </form>

        </div>

      </div>
    </>
  )
}

export default Register 