import React, { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginInitiate, setActiveAccount } from "../../redux/Action/ActionAuth";
import { LoginTests } from "../../Style/Authentication/LoginTest";
import axios from "axios";
import { authenticate } from "../../helpers/auth";
import { Formik } from 'formik';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import { toastError } from "../../utils";

const Login = () => {
  //   const {
  //     register,
  //     formState: { errors },
  //     handleSubmit,
  //     watch,
  //   } = useForm();
  const passwords = useRef({});
  //   passwords.current = watch("password");
  const [isLock, setIsLock] = useState(false);
  const handleIsLock = () => {
    setIsLock(!isLock);
  };
  const { auth, userActive } = useSelector((state) => state.auth);
  const test = useSelector((state) => state.auth.userActive);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (data) => {
    const { email, password } = data;
    await axios.post(`http://localhost:5000/api/auth/customer/login`, {
      email,
      password,
    }).then((res) => {
      if (res.data.status === 200) {
        authenticate(res);
        console.log('res', res)
        dispatch(setActiveAccount(res.data.user))
        navigate('/');
      }else {
        toastError(res)
      }
    })
  };

  return (
    <div className="login-section">
      {/* <LoginTests /> */}
      <div className="container">
        <div className="wrapper">
          <div className="w-100 d-flex justify-content-center align-items-center flex-column">

          <h1 className="title">SIGN IN</h1>
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
                    placeholder="username"
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
                  {errors.name && <div id="feedback">{errors.name}</div>}
                  <CButton type="submit" className="btn">Login</CButton>

                </div>
              </CForm>
            )}
          </Formik>
          </div>
          </div>
          {/* <form className="form" onSubmit={handleSubmitForm}>
            <input
              className="input"
              placeholder="username"
              type="email"
              name="email"
              id="email"
            />
            <span style={{ color: "red" }}>
            </span>
            <div className="passwordContainer">
              <input
                type={isLock ? "type" : "password"}
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
              </span>
            </div> */}
          {/* <button className="btn">LOGIN</button>
            <Link to="/register" className="forgot">
              DO NOT YOU REMEMBER THE PASSWORD{" "}
            </Link>
            <Link to="/register" className="create">
              CREATE A NEW ACCOUNT
            </Link>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
