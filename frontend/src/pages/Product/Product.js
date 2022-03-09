import React from 'react'
import styled from "styled-components"
import {Header,Announcement,Newsletter,Footer} from "../../imports/index"
import { Add, Remove } from "@material-ui/icons";
import {mobile} from '../../Style/Authentication/responsive'
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




const Product = () => {
  return (
    <Container>
        <Header/>
        <Announcement/>
        <Wrapper>
            <ImgContainer>
                <Image src='https://cf.shopee.vn/file/6c3580d83a6d9d001f732895f26cfcc2'/>
            </ImgContainer>
            <InfoContainer>
                <Title>Denim Jumpsuit</Title>
                <Desc>cached modules 6.2 MiB (javascript) 328 KiB (asset) [cached] 6265 modules
runtime modules 31.3 KiB 15 modulescached modules 6.2 MiB (javascript) 328 KiB (asset) [cached] 6265 modules
runtime modules 31.3 KiB 15 modules</Desc>
                <Price>$ 20</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        <FilterColor color="black"/>
                        <FilterColor color="darkblue"/>
                        <FilterColor color="gray"/>
                    </Filter>
                    <Filter>
                    <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                        
                        <FilterSizeOption>XS</FilterSizeOption>
                        <FilterSizeOption>S</FilterSizeOption>
                        <FilterSizeOption>M</FilterSizeOption>
                        <FilterSizeOption>L</FilterSizeOption>
                        <FilterSizeOption>XL</FilterSizeOption>
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                    <Remove/>
                    <Amount>1</Amount>
                    <Add/>
                    </AmountContainer>
                    <Button>Add to cart</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product