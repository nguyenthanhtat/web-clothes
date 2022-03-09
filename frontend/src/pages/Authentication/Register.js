import React,{useState,useRef, useEffect} from 'react'
import {RegisterStyle} from '../../Style/Authentication/RegisterStyle'
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux'
import {RegisterInitiate,clearErrors} from '../../redux/Action/ActionAuth'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const {
    register,
    formState:{errors},
    handleSubmit,
    watch,
    getValues,
    reset,
  } = useForm();
  const passwords = useRef({})
  passwords.current = watch("password")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{authRegister,loading} = useSelector((state)=> state.auth);
  const handleSubmitForm =(data)=>{
    const {email,fullname,password} = data;
    dispatch(RegisterInitiate(fullname,email,password));
  }
  console.log(authRegister,'authreasdas')
 

  console.log(authRegister,'authreasdas')
  const [isLock,setIsLock] = useState(false);
  const handleIsLock = () => {
    setIsLock(!isLock);
  };
  const [isLockPc,setIsLockPc] = useState(false);
  const handleIsLockPc = () => {
    setIsLockPc(!isLockPc);
  };
  useEffect(() => {
    if(authRegister.success === true){
      reset();
      toast.success(`${authRegister.msg}`);
      window.location.href ="/logintest";
      dispatch(clearErrors());
      
    }else if (authRegister.success === false){
      toast.error(`${authRegister.msg}`);
    }
  },[authRegister])
  return (
    <>
    <RegisterStyle/>
    <div className="container">
      <div className="wrapper">
        <h1 className="title">CREATE ACOUNT</h1>
        <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
        {/* <input className="input" placeholder= "name"/>
        <input  className="input" placeholder= "last name"/> */}
        <input  className="input" placeholder= "fullname"
        {...register("fullname",{required:true,maxLength:20})}
          type='text' name='fullname' id='fullname'
        />
        <span style={{ color: "red" }}>
              {errors.fullname?.type === "required" &&
                "Mời bạn nhập đầy đủ tên vào!"}
              {errors?.fullname?.type === "maxLength" &&
                "Tên của bạn không được quá 20 kí tự"}
        </span>
          <br />
        <input  className="input" placeholder= "email"
        {...register('email',{required:true,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i})}
        type='email' name ='email' id='email'
        />
        <span style={{color:'red'}}>
        {errors.email?.type==='required'&&"Mời Bạn Nhập Đầy Đủ Email"}
        {errors?.email?.type ===' pattern'&&"Email Của Bạn Không Hợp Lệ"}
        </span>
        <br />
        <div className="inputContainer">
        <input  className="password" placeholder= "password"
        {...register('password',{required:true,minLength:{
          value:6,
        },pattern:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        })}
        type='password' name='password' id='password'    
         />
        {isLock ?(
        <i className="fa fa-eye-slash icon"
                    onClick={handleIsLock} 
        />
        ):(
        <i className="fa fa-eye icon"
                    onClick={handleIsLock}
        />
        )}
         <span style={{color:'red'}}>
         {errors.password?.type ==='required' && "Mời Bạn Nhập Đầy Đủ Mật Khẩu"}
         {errors?.password?.type ==='minLength'&&"Mật Khẩu Phải 6 Kí Tự Trở Lên"}
         {errors?.password?.type ==='pattern'&& "Mật Khẩu Phải Có Chữ In Hoa,Số,Kí Tự Đặt Biệt"}
         </span>
         </div>
         <br />
        <div className="inputContainer">
        <input className="confirmPassword" placeholder= "confirm password"
        {
          ...register("confirmPassword",{required:true,validate:(value)=>
          value ===getValues('password') || "The passwords do not match",
          })
        }
        type='password' name='confirmPassword' id='confirmPassword' 
        />
                {isLockPc ?(
        <i className="fa fa-eye-slash icon"
                    onClick={handleIsLockPc} 
        />
        ):(
        <i className="fa fa-eye icon"
                    onClick={handleIsLockPc}
        />
        )}
        <span style={{color:'red'}}>
          {errors.confirmPassword?.type === 'required' && 'Mời Bạn Nhập Lại Mật Khẩu'}
          {errors.confirmPassword?.type === 'validate' && 'Mật Khẩu Không Khớp'}

        </span>
        </div>
        <br />
        <span className="agreement">By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b></span>
        <button className= "btn">CREATE</button>

        </form>
        
      </div> 

    </div>
    </>
  )
}

export default Register 