import React from 'react'
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import {Header,Footer,Announcement} from '../imports/index'
import { mobile } from "../Style/Authentication/responsive";
const Container = styled.div `

`
const Wrapper = styled.div`
    padding:20px;
    ${mobile({padding:"10px"})}
`
const Title = styled.h1`
font-weight:300;
text-align:center;
`
const Top = styled.div `
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
    ${mobile({width:""})}
`
const TopButton = styled.button `
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border:${(props)=>props.type ==="filled"&&"none"};
    background-color:${(props)=>props.type ==="filled"?"black":"transparent"};
    color:${(props)=>props.type ==="filled"&&"white"};
`
const TopTexts = styled.div`
    ${mobile({display:"none"})}
`;
const TopText =styled.span `
    text-decoration:underline;
    cursor: pointer;
    margin:0 10px;
`
const Bottom = styled.div `
    display: flex;
    justify-content:space-between;
    ${mobile({flexDirection: "column" })}
`;
const Info = styled.div `
    flex:3;
`
const Product = styled.div`
    display: flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column" })}
`
const ProductDetails = styled.div`
    flex :2;
    display:flex;
`
const Image = styled.img`
    width:200px;
`
const Details = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${props=>props.color}
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
    flex:1;
`
const ProductAmountContainer = styled.div`
    display:flex;
    align-items:center;
    
` 
const ProductAmount = styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({margin:"5px 15px"})}
` 
const ProductPrice = styled.div`
    font-size:30px;
    font-weight:200;
    ${mobile({marginBottom:"20px"})}
` 
const Hr = styled.hr `
    background-color:black;
    border:none;
`
const Sumary = styled.div `
    flex:1;
    border:0.5px solid lightgray;
    border-radius:10px;
    padding:20px;
    height:50vh;
`;
const SummaryTitle = styled.h1 `
    font-weight:200;
`;
const SummaryItem = styled.div `
    margin: 30px 0px;
    display:flex;
    justify-content: space-between;
    font-weight:${props=>props.type === "total" && "500"};
    font-size:${props=>props.type === "total" && "24px"};
    
`;
const SummaryItemText = styled.span `
   
`;
const SummaryItemPrice = styled.span `
 
`;
const Button = styled.button `
    width:100%;
    padding:10px;
    background-color:black;
    color:white;
    font-weight:600;
`

const Cart = () => {
  return (
    <>
    <Container>
        <Header/>
        <Announcement/>
        <Wrapper>
            <Title>Your Bag</Title>
            <Top>
                <TopButton >Continue Shopping</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your WishList(0)</TopText>
                </TopTexts>
                <TopButton type="filled">CheckOut Now</TopButton>
            </Top>
            <Bottom>
                <Info>
                    <Product>
                        <ProductDetails>
                            <Image src='https://cf.shopee.vn/file/2b155aac9bdc003d48615163dec8fe00_tn' />
                            <Details>
                                
                                    <ProductName><b>Product:</b> Jessie thunder shoes</ProductName>
                                    <ProductId><b>ID</b>12312124</ProductId>
                                    <ProductColor color='black'/>
                                    <ProductSize><b>Size</b>37.5</ProductSize>
                            </Details>
                        </ProductDetails>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add/>
                                <ProductAmount>2</ProductAmount>
                                <Remove/>
                            </ProductAmountContainer>
                            <ProductPrice>$ 30</ProductPrice>
                        </PriceDetail>
                    </Product>
                    <Hr/>
                    <Product>
                        <ProductDetails>
                            <Image src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDw0PDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURExUYKDQgGBonGxUVITEhJTUrLi46Fx8zODMvNyktLi4BCgoKDg0OFw8PFS0dFR0rLS0rLS03Kys3Ky0tLTctKzc3KzErKy0uLSstKy04KzE3Ky0rLi03KzcrLi0yKy0tK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQIEAwUGB//EADYQAAIBAgMECAMIAwEAAAAAAAABAgMRBCExEkFRcQUUImGBkaGxEzJSBiNCcpLB0eEVQ/Hw/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABwRAQEBAAIDAQAAAAAAAAAAAAABEQJhAxJBQv/aAAwDAQACEQMRAD8A/uIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkpJK7OedZvTJeoHrUqqPe+CPOGJV7PLhvPAzJf0awd6mno15mj5yPOpi6UHsyq04StfZlUjGVuTJg+qRtLV2PmLF03/tpu+n3kczbGDqq4lLJdpvyNQrJ9zOKK3/8AkjaLg7wclOq4964HRCopaa8CYNgAgAAAAAAAAAAAAAAAAAAARu2b0RTlxVS72Vzl/AGKlTafnZGRv8CmgIUAQ/N/aH7NVcXUlUp4mNLagoOMqLk1ZWupJ5eR+lZAPxmH+x2Ijs3xlOLiuzOGHcqiktJdp2vfPO5+vowlGMVKcqkkknUkoxlJ8WopJeBsoBIoFgIVAAdFCrfJ6+6PY+fB2afC53QldJ8SUaABAAAAAAAAAAAAAAAABirPZTflzOKO9vU9MRU2nZaL1ZhI1AWr8DRmO/maCgACFiWLclwFgAAAAFB4V8XSpOEalWnTlVls04znGLqS4RT1ea04nsBI7+Z64epZ7L0enM8o7+Zmfdqs7gfRBijU2knv38zZkAAAAAAAAAAAAAA8687LvZtuxx1J3bflyLBhI0iIpVSGnixVSs9ptRs7tNxaVs2ms1zQhojTCPxX2MrYiVTB9YqV5ufRab2quLnGVZVFtSqxn2VUd5d+T3Hdh+l6/wDkZXhXeCruWDpt057NPEUUpfE2bXipOdSLm8ns0ran6ggH4zGYuvT6T7MsZ1d4nCU5uPW6tKO3RqXSptfD2HOME5L5XJPi169P4qvDFYhUJ4t1I4bBSwtKnGrLDyxLrVFOMstiziqe1fRZ5PM+1h54xP7yMmrTX+pO9+y1nwt66no5Yn4dOyantPauqfy7tr+jpeHcc55dm+tfH+0+KxNHE4d4aVd7VCvTq0oQnOjac4Qp1n+FShKTk97jGetkc+FxOJ6h0O6ksSo1JU10nVqOrTxMI/AqNuTynD75U02rWT3I/QzWJtTab+SHxEvh3201tJX43f6e8549d2U72qbOaapbO1fiu7f6CcO4XyZ+a+RiMXif8fTnOeIpVH0hRhCcVJV5YJ49RUppK6vh7ybea1dmaxmKxP8AjMZOM8Ttwq11g6mzOOJqUlVtTbUVtZ5pO12knne59h1MZtK0Eo7dpO8G/h7Uc9dbKeXeuB9NGbxz61x5e3x+d6P6LpYunQqYiVadXD1dt3nVdNVdmLcYSqJSnTV3Z98lfVH6IAy0zHV+BWFq+RWBcPPZfdoztPn7zqw87qz1XsSj2ABAAAAAAAAAAM1J7Kv5cwPHEz/CvE8A35g0Kg9HyCEtGAju5FCIwqgpADIVhhEBULAQqIyoAGAwMfi8GaMy1iaYGZGoytZrcRkiB3wldJreU5cPUs7PR6czqMgAAAAAAAAcVartPLRaHY1c5qtC2mnsWDxsEUIooenigR7uYGkRgMKpSFQEYYZGBUVBEAjKiMqAFIAMT3c0aZirobYRGRBiKAkmldvJLNt5JLia6G6Xw2NhKeGr068adSVKcqUlOKqRtdXXNeZydLdFwx2Hr4artfDr05U5OLtKN9JLvTs/A8fst0BUwalOvX+NXqQhCapxcKCUXJppO7v2nnyy1blH6AAEAAAAAAAAHjUo3zWT4bmc7VjuMVKalz4l0cY4eJZxadn/ANJ/BRQCAaRUZRoKywwAKQpAIVGWVBFKQBWZrJli9OSEtDVGDklbz3AZse1Og3rkvU9qdJR73xNk1EjFLQoBAAAAAAAAAAAAAAZnBSVn/wAOOcdmTWtkjuOOt88vD2LBkgBRUaMooVkpCoIpCkYVhmkRlQQKQAGdOF+SPj7s5mdGDfZ5SfuKPcAGQAAAAAAAAAAAAAAAAOKp88+a9kdpwS+af5mWAQpllGkUiKBCkCApWRFCsMIMIIoIUAe2B0l+b9keB64F/Ou9MUdYAMgAAAAAAAAAAAAAAAAfPk85fml7n0D5reb5v3LFjRADSqikRSMowgyIK0UiKBlkRWQAUhQIz0wL7U+9L9zykbwb7bXGL90B3gAygAAAAAAAAAAAAAAAAfLvm+bPqHyUyxXoVGEbRoVBgjZECEuEyq2imUzQEZkrMpgUEbJcAzWFf3ke9SXoYYou1SH5v2sB9UAGEAAAAAAAAAAAAAAAAZqOyk+Cb9D5MWfUxHyT/LL2PkRZqD1TNqR5MzCZVdNzzkyKRi4G0ypmCoI9YsphFzCkmZTzEmee8DbZLhksEVsxCXbh3Sj7llF8TyUJXWmTuUfeABzAAAAAAAAAAAAAAAAGK0NqLSdr7zj6g/qXkd4GjkeDf1LyPJ9HO7aks+5n0AXRwrBS+pepOpS4x9TvA0cHUp8YepVg5/VD9LZ3AaONYSX1x/S/5L1SX1r9H9nWBo45YJv8a/R/YWB4yvyjY7ANHL1NfU/IvU1xfodIGjm6nHjL0HU4cZeh0gmggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=' />
                            <Details>
                                
                                    <ProductName><b>Product:</b> T-shirt Beautiful</ProductName>
                                    <ProductId><b>ID</b>12312124</ProductId>
                                    <ProductColor color='gray'/>
                                    <ProductSize><b>Size</b>XXL</ProductSize>
                            </Details>
                        </ProductDetails>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add/>
                                <ProductAmount>1</ProductAmount>
                                <Remove/>
                            </ProductAmountContainer>
                            <ProductPrice>$ 20</ProductPrice>
                        </PriceDetail>
                    </Product>
                </Info>
                <Sumary>
                    <SummaryTitle>Order summary</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemText>$ 80</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemText>$ 5.9</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemText>$ -5.9</SummaryItemText>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText >Total</SummaryItemText>
                        <SummaryItemText>$ 90</SummaryItemText>
                    </SummaryItem>
                    <Button>Check out now</Button>
                </Sumary>
            </Bottom>
        </Wrapper>





        <Footer/>
    </Container>
    </>
  )
}

export default Cart