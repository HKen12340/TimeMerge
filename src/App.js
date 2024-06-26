import './App.css';
import React from 'react';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom';

import EventCreate from './EventCreate'; 
import ShowEvent from './ShowEvent';


function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EventCreate />}/>
        <Route path='/show/:id' element={<ShowEvent />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );

}

export default App;
