import React from 'react'
import {useSelector} from 'react-redux'
import {Header,Footer,Announcement,Slider,Categories,Products,Newsletter,NavBar} from '../../imports/index'
const Home = () => {
  return (
    <>
    <Announcement />
    <Header/>
    <Slider/>
    <Categories />
    <Products/>
    <Newsletter/>
    <Footer/>
    
    </>
  )
}

export default Home