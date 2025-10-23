import React from 'react'
import { Navbar } from '../componnents/Navbar'
import Hero from '../componnents/Hero'
import  About  from '../componnents/About'
import Cta from '../componnents/Cta'
import Footer from '../componnents/Footer'

export const Home = () => {
  return (
    <>
        <Navbar />  
        <Hero /> 
        <About />   
        <Cta  />  
        <Footer /> 
    </>
  )
}
