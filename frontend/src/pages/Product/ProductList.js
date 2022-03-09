import React from 'react'
import {Header,Announcement,Products,Newsletter,Footer} from "../../imports/index"
import styled from "styled-components"
import {mobile} from "../../Style/Authentication/responsive"
const Container = styled.div`

`
const Title = styled.h1`
    text-align: center;
    margin:20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({marginLeft:"20px"})}
`
const Filter = styled.div`
    margin:20px
    ${mobile({width:"0px 20px",display:"flex",flexDirection:"column" })}
`
const FilterText = styled.span`
    font-size:20px;
    font-weight: 600;
    margin-right:20px;
    ${mobile({marginRight:"0px"})}

`
const Select = styled.select`
    padding:10px;
    margin-right:20px;
    ${mobile({margin:""})}

`
const Option = styled.option`

`

const ProductList = () => {
  return (
    <Container>
        <Header/>
        <Announcement/>
        <Title>Dresses</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Product:</FilterText>
                <Select>
                    <Option disabled selected>
                        Color
                    </Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Blue</Option>
                    <Option>Yellow</Option>
                    <Option>Greeen</Option>
                </Select>
                <Select>
                    <Option disabled selected>
                        Size
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText> Sort Product:</FilterText>
                <Select>
                    <Option disabled selected>
                        Newest
                    </Option>
                    <Option>Price (asc)</Option>
                    <Option>Price (desc)</Option>
        
                </Select>
            </Filter>
        </FilterContainer>
        <Products />
        <Newsletter />
        <Footer />

    </Container>
  )
}

export default ProductList