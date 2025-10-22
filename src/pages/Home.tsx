import React from 'react'
import { Navbar } from '../componnents/Navbar'
import Hero from '../componnents/Hero'
import  About  from '../componnents/About'

export const Home = () => {
  return (
    <>
        <Navbar />  
        <Hero /> 
        <About />      
    </>
  )
}
