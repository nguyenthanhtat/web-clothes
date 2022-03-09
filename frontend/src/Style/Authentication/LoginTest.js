import { createGlobalStyle } from "styled-components";
import {mobile} from "./responsive";
export const LoginTests = createGlobalStyle`
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
    width: 35%;
    padding: 20px;
    background-color: white;
    border-radius:10px ;
    
    ${mobile({ width: "75%" })}

}
.form{
    display: flex;
    flex-direction: column;
}
.title{
    font-size: 24px;
    font-weight: 300;   

}
.input{
    position:relative;
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 10px;
}
.icon{
    position:absolute;
    cursor: pointer;
    top:0;
    right:0;
    padding:25px 10px;
}
.btn{
    width: 40%;
    border: none;
    padding: 10px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;

}
.forgot{
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
}
.create{
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    
}
.passwordContainer{
    position:relative;
    display:flex;
    flex-direction: column;
    


}


`