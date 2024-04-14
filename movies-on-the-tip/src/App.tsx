import React, { useState } from 'react';


import { Route, Routes } from 'react-router-dom';
import MovieHome from './Components/MoviesHome';
import Preview from './Components/Preview';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [activeKey, setActiveKey] = useState<string>('movies-in-theaters');
  return (
    <Routes>
      <Route path='/' element={<MovieHome activeKey={activeKey} setActiveKey={setActiveKey}></MovieHome>}></Route>
      <Route path='/:movieName' element={<Preview></Preview>}></Route>
    </Routes>
  );
}

export default App;
