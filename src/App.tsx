import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

function App() {

  const [theme, setTheme] = useState('light')
  return (
    <div className={theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-black'  }>
      
        <Routes>
          <Route path='/' element={<Home theme={theme} setTheme={setTheme} />} />
        </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
