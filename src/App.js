import './App.css';
import React from 'react';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom';

import EventCreate from './EventCreate'; 
import ShowEvent from './ShowEvent';
import EventUrlShow from './EventUrlShow';
import EventEdit from './EventEdit';
import Page404 from './NotFound';

function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EventCreate />}/>
        <Route path='/show/:id' element={<ShowEvent />}/>
        <Route path='/EventUrlShow/:id' element={<EventUrlShow />}/>
        <Route path='/EventEdit/:id' element={<EventEdit />}/>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
    </div>
  );

}

export default App;
