import { createGlobalStyle } from "styled-components";
import {mobile} from "../Authentication/responsive";
export const FooterStyle = createGlobalStyle`
.container{
    background-color:#EDF5E1;
    display: flex;
    ${mobile({ flexDirection: "column" })}
}
.left{
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
}
.desc{
    margin: 20px 0px;
}
.socialContainer{
    display: flex;

}
.socialIcon{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;

}
.center{
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
}
.title{
    margin-bottom: 30px;
}
.list{
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}
.listItem{
    width: 50%;
    margin-bottom: 10px;
}
.right{
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8" })}
}
.ContactItem{
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}
.payment{
    width: 50%;
}   
`