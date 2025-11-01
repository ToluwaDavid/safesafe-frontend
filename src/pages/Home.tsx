import React from 'react'
import { Navbar } from '../componnents/Navbar'
import Hero from '../componnents/Hero'
import  About  from '../componnents/About'
import Cta from '../componnents/Cta'
import Footer from '../componnents/Footer'

interface HomeProps {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const Home : React.FC<HomeProps> = ({theme, setTheme}) => {
  return (
    <>
        <Navbar theme={theme} setTheme={setTheme} />  
        <Hero /> 
        <About />   
        <Cta  />  
        <Footer /> 
    </>
  )
}
