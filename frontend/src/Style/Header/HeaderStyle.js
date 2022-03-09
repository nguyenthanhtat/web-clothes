import { createGlobalStyle } from "styled-components";
import {mobile} from "../Authentication/responsive";
export const HeaderStyle = createGlobalStyle`

.header{

    height: 80px;
    ${mobile({ height: "50px",marginBottom:"10px" })}
}
.wrapper{
    margin:0;
    background-color:#EDF5E1;
    width:100%;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}

}
.left{
    flex: 1;
    display: flex;
    align-items: center;

}
button{
    padding:5px;
    border-radius:10px;
    &:hover{
        background-color:#fbf8cc;
    }

}
.language{
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}

}
.searchContainer{
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;

}
.input{
    border: none;
    &:hover{
        background-color:#fbf8cc;
    }

    ${mobile({ width: "50px" })}

}
.center{
    flex: 1;
    text-align: center;

}
.Logo{
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}

}
.right{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}

}
.menuItem{
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}

}
    

`;