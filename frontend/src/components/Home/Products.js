import { useEffect, useState } from "react";
import styled from "styled-components";

import{Product} from "../../imports/index";
import axios from "axios";
import { useSelector } from "react-redux";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({cat,filters,sort}) => {
  const { product, loading } = useSelector((state) => state.product);
  console.log(product,'productssss')
 
  return (
    <Container>
      {product.map((item) => (
        <Product item={item} key={item._id} />
      ) )}
    </Container>
  );
};

export default Products;

