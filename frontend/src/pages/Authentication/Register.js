import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React, { useEffect, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterInitiate, loginGoogleInitiate } from '../../redux/Action/ActionAuth';
import { RegisterStyle } from '../../Style/Authentication/RegisterStyle';
import { Formik } from 'formik';
import { CButton, CForm, CFormInput } from '@coreui/react';
import axios from 'axios';
import { toastError } from '../../utils';

const Register = () => {
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  //   watch,
  //   getValues,
  //   reset,
  // } = useForm();
  // const passwords = useRef({})
  // passwords.current = watch("password")
  const [isLock, setIsLock] = useState(false);
  const handleIsLock = () => {
    setIsLock(!isLock);
  };
  const userActive = useSelector((state) => state.auth.userActive);
  console.log('userActive', userActive)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authRegister, customer, auth } = useSelector((state) => state.auth);
  const handleSubmitForm = async(data) => {
    console.log('data', data)
    const { email, fullname, password } = data;
    await axios.post(`http://localhost:5000/api/auth/customer/register`, {
      email,
      fullname,
      password,
    }).then((res) => {
      if (res.data.status === 200) {
        console.log('res', res)
        toast.success(`check email`);
      }else {
        toastError(res)
      }
    })
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
      // reset();
      toast.success(`${authRegister.msg}`);
      navigate("/login");;

    } else if (authRegister.success === false) {
      toast.error(`${authRegister.msg}`);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authRegister])
  useEffect(() => {
    if (auth.success === true) {
      window.location.href = "/";
      localStorage.setItem("firstLogin", true);
    }
    if (auth.success === false) {
      toast.error(`${auth.msg}`);
    }
  }, [auth]);
  const handleLoginGoogle = (credentialResponse) => {
    dispatch(loginGoogleInitiate(credentialResponse.credential));
  }
  const handleLoginGoogleFail = (credentialResponse) => {
    return toast.error(credentialResponse);
  }

  return (
    <div className="login-section">
      <RegisterStyle />

      <div className="container">
        <div className="wrapper">
          <div className="w-100 d-flex justify-content-center align-items-center flex-column">
            <h1 className="title">CREATE ACOUNT</h1>
            <div className="w-100">

              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmitForm}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  handleBlur
                }) => (
                  <CForm onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center align-items-center flex-column">
                      <CFormInput
                        className="input"
                        placeholder="fullname"
                        name="fullname"
                        id="fullname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                        <CFormInput
                      className="input"
                      placeholder="email"
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                      <CFormInput
                        type={isLock ? "type" : "password"}
                        //  {...register("password", { required: true })}
                        className="input"
                        placeholder="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />

                      <CButton type="submit" className="btn mt-2">Register</CButton>
                    </div>
                  </CForm>
                )}
              </Formik>
            </div>
            {/* <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
            {/* <input className="input" placeholder= "name"/>
            <input  className="input" placeholder= "last name"/> */}
            {/* <input className="input" placeholder="fullname"
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
            <button className="btn" onClick={navigate('/login')}>CREATE</button> */}

            {/* </form>  */}


          </div>

        </div>
      </div>
      </div>
      )
}

      export default Register 