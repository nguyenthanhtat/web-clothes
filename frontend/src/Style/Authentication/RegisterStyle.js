import { createGlobalStyle } from "styled-components";
import {mobile} from "./responsive";
export const RegisterStyle = createGlobalStyle`
.container{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      url("https://cellphones.com.vn/sforum/wp-content/uploads/2020/05/canvas-vector-iphone-wallpaper-jianoliu-idownloadblog-mock-up.png")
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}
.wrapper{
    width: 40%;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    ${mobile({ width: "75%" })}

}
.title{
    font-size: 24px;
    font-weight: 300;

}
.form{
    display: flex;
    flex-wrap: wrap;

}
.input{
    flex: 1;
    min-width: 90%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    border-radius: 10px;    
    position: relative;
    &:hover{
        background-color:#E9ECEF;
    }
}
.password{
    
    width:100%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    border-radius: 10px;    
    position: relative;
    &:hover{
        background-color:#E9ECEF;
    }
}
.confirmPassword{
    
    width:100%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    border-radius: 10px;    
    position: relative;
    &:hover{
        background-color:#E9ECEF;
    }
}
.inputContainer{
    padding-right:10px;
    width:100%;
    display: flex;
    flex-direction: column;
    position: relative;
}
.inputContainer i{
    position: absolute;
    top:50%;
    right:0px;
    padding-right:20px;
  
}

.agreement{
    font-size: 12px;
    margin: 20px 0px;

}
.btn{
    width: 40%;
    border-radius:10px;
    padding: 15px;
    background-color: teal;
    color: white;
    cursor: pointer;

    &:hover{
        background-color:#E8A87C;
        }


}
`