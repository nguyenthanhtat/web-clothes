import React,{useState,useEffect, useContext} from 'react'
import styled from "styled-components"
import {Header,Announcement,Newsletter,Footer} from "../../imports/index"
import { Add, Remove } from "@material-ui/icons";
import {mobile} from '../../Style/Authentication/responsive'
import {useLocation} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from "react-router-dom";
import {GetFindProductInitiate} from '../../redux/Action/ActionProduct'
import { toast } from "react-toastify";
import { GlobalState } from '../../Context/GlobalState';
const Product = () => {
    const { id } = useParams();
    const [quanlity,setQuanlity] =useState(1)
    const [color,setColor] =useState("")
    const [size,setSize] =useState("")
    const location = useLocation();
    const dispatch = useDispatch();
    const state = useContext(GlobalState)
    const [callback, setCallback] = state.callback
    const {refreshTokens}=useSelector((state)=> state.auth);
    const {productDetails,product}=useSelector((state)=> state.product);
    console.log(productDetails,'productDetails')
    useEffect(() => {
        if(id){
            dispatch(GetFindProductInitiate(id))
        }else{
            toast.error("don't find product")
        }
    },[id,product,callback])
    const handleQuanlity =(type)=>{ 
      if(type==="dec"){
        quanlity>1 && setQuanlity(prev => prev - 1);
      }else{
        setQuanlity(prev => prev + 1);
      }
    }
    // const handleADD =()=>{
    //   dispatch(
  
    //     addProduct({...product,quanlity,color,size}))
    // }
  return (
    <Container>
        <Header/>
        <Announcement/>
        <Wrapper>
            <ImgContainer>
                <Image src={productDetails.image}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{productDetails.title}</Title>
                <Desc>{productDetails.desc}</Desc>
                <Price>{productDetails.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {productDetails.color?.map((c,index)=>(
                            <FilterColor color={c} key={index}  onClick={()=>setColor(c)}/>

                        ))}
                    </Filter>
                    <Filter>
                    <FilterTitle>Size</FilterTitle>
                    <FilterSize onChange={(e)=>setSize(e.target.value)}>
                        {productDetails.size?.map((s,index)=>(
                        <FilterSizeOption key={index}>{s}</FilterSizeOption>

                        ))}
            
                    </FilterSize>
                            </Filter>
                </FilterContainer>
                <AddContainer>
                <AmountContainer>
                <Remove 
                onClick={()=>handleQuanlity("dec")} 
                />
                <Amount>{quanlity}</Amount>
                <Add 
                onClick={()=>handleQuanlity("inc")}
                 />
                </AmountContainer>
                <Button 
                // onClick={handleADD}
                >ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product
const Container=styled.div`

`
const Wrapper=styled.div`
    padding:50px;
    display:flex;
    ${mobile({padding:"10px",flexDirection: "column" })}

`
const ImgContainer=styled.div`
    flex:1;
`
const Image=styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;
    ${mobile({height:"40vh"})}
`
const InfoContainer=styled.div`
    flex:1;
    padding 0px 50px;
    ${mobile({padding:"10px"})}
`    
const Title=styled.h1`
    font-weight:200;

`
const Desc=styled.p`
    margin: 20px 0px;

`
const Price=styled.span`
    font-weight:100;
    font-size:40px;

`
const FilterContainer=styled.div`
    width:50%;
    margin:30px 0px;
    display:flex;
    justify-content: space-between;
    ${mobile({width:"100%"})}

`
const Filter=styled.div`
    display: flex;
    align-items: center;

`
const FilterTitle=styled.span`
    font-size:20px;
    font-weight:200;

`
const FilterColor=styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${props=>props.color};
    margin:0px 5px;
    cursor: pointer;
`
const FilterSize=styled.select`
    margin-left: 10px;
    padding:5px;
`
const FilterSizeOption=styled.option`

`
const AddContainer=styled.div`
    width:50%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({width:"100%"})}
`
const AmountContainer=styled.div`
    display:flex;
    align-items:center;
    font-weight:700;
`
const Amount=styled.span`
    width:30px;
    height:30px;
    border-radius:10px;
    border:1px solid teal;
    display:flex;
    align-items: center;
    justify-content: center;
    margin:0px 5px;
`
const Button=styled.button`
    padding:15px;
    border-radius:10px;
    border:2px solid teal;
    background-color:white;
    cursor:pointer;
    font-weight:500;

    &:hover{
        background-color:#E8A87C;
        }


`;