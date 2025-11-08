import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

  const getInitialTheme = (): 'light' | 'dark' =>{
    try {
      const stored = localStorage.getItem('theme');
      return stored === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light'
    }
  }  

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme())

  useEffect(()=>{
    const root = document.documentElement; 
    if(theme === 'dark'){
      root.classList.add('dark');
    }else {
       root.classList.remove('dark');
    }

    try {
       localStorage.setItem('theme', theme)
    } catch (error) {
      console.warn('Could not save theme to localStorage:', error)
    }
   
  }, [theme])


  return (

     <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-bgDark text-textDark' : 'bg-bgLight text-textLight'
    }`}>
      <Routes>
        <Route path='/' element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/register" element={<Register theme={theme} setTheme={setTheme} />} />
        <Route path="/login" element={<Login theme={theme} setTheme={setTheme} />} />
      </Routes>
    </div>
  );
}

export default App;
