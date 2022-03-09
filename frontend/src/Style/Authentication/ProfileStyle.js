import {createGlobalStyle} from 'styled-components'
import {mobile} from "../Authentication/responsive";
export const ProfileStyle = createGlobalStyle`
.profile{

}
.profile_wrapper{
    padding:50px;
    display:flex;
    justify-content: center;
    width:100%;
    height:850px;
    ${mobile({flexDirection: "column" }) }
}
.user{

    border: 5px solid;
    border-radius:10px;
    margin:10px;
    padding:10px;
    height:350px;
    width:30%;
    position: relative;
	background: #fff;

	/*The background extends to the outside edge of the padding. No background is drawn beneath the border.*/
	background-clip: padding-box;

	border: solid 8px transparent;
	border-radius: 0.8rem;

	&:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		margin: -8px; /* same as border width */
		border-radius: inherit; /* inherit container box's radius */
		background: linear-gradient(to left, turquoise, greenyellow);
	}
    ${mobile({display: "flex",flexDirection: "column",width:"100%",justifyContent:"center"})}
}
.user input{
    border: 2px solid black;
    border-radius:10px;
    background-color:white;
    width:100%;
    &:hover{
        background-color:#fbf8cc;
    }

}
.user img{
    border-radius:50%;
    width:30%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  
}
.user1{
  
    border: 5px solid;
    border-radius:10px;
    margin:10px;
    padding:10px;
    width:40%;
    display:flex:
    justifyContent: "center";
    position: relative;
	background: #fff;

	/*The background extends to the outside edge of the padding. No background is drawn beneath the border.*/
	background-clip: padding-box;

	border: solid 8px transparent;
	border-radius: 0.8rem;

	&:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		margin: -8px; /* same as border width */
		border-radius: inherit; /* inherit container box's radius */
		background: linear-gradient(to left, turquoise, greenyellow);
	}
    ${mobile({flexDirection: "column",width:"100%",padding:"20px",})}


}
.user1 .input{
    border: 2px solid black;
    border-radius:10px;
    background-color:white;
    padding:10px;
    margin-bottom:15px;
    width:100%;
    &:hover{
        background-color:#fbf8cc;
    }

}
.profile_btn{
    border-radius:20px;
    &:hover{
        background-color:green;
    }
    font-weight:bold;
    padding:10px;
}
.user1 label{
    font-size:18px;
    font-weight:500;
    &:hover{
        color:red;
    }
}

.block{
    width:100px;
    height:100px;
    background-color:#CAFAFE;

    left:0;
    top:50%;
    transform:translateY(-50%);
    // transform: translate(-50%,-50%)
}
.cha{
    width:600px;
    height:300px;
    position:relative;
    background-color:#EDF5E1;

}

p{
    margin:10px;
    border:2px solid black;
    text-align: center;
    padding:10px;
    border-radius: 10px;
    background-color:white;
    &:hover{
        background-color:#fbf8cc;
    }

}
.form_container{
    display:flex;
    flexDirection: "column";
    border:solid 2px black;
    border-radius:10px;
    margin-bottom:10px;
}
.form_container_item{
    padding:10px;
    
}
.img_avatar{
    width:200px;
    height:250px;
}


`