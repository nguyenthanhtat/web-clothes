import React from 'react'
import {useSelector} from 'react-redux'
import {Header,Footer,Announcement,Slider,Categories,Products,Newsletter,NavBar} from '../../imports/index'
// import { CAlert } from '@coreui/react';
import { CButton } from '@coreui/react';
const Home = () => {

  return (
    <>
    <CButton color="primary">Click Me</CButton>
    <Announcement />
    <Header/>
    <Slider/>
    {/* <Header/>
    <Slider/>
    <Categories />
    <Products/>
    <Newsletter/>
    <Footer/>  */}
    
    </>
  )
}

export default Home