import './App.css';
import React from 'react';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom';

import EventCreate from './pages/EventCreate'; 
import ShowEvent from './pages/ShowEvent';
import EventUrlShow from './pages/EventUrlShow';
import EventEdit from './pages/EventEdit';
import EventDecision from './pages/EventDecision';
import EmailSubmitAfter from './pages/EmailSubmitAfter';
import Page404 from './pages/NotFound';

function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EventCreate />}/>
        <Route path='/show/:id' element={<ShowEvent />}/>
        <Route path='/EventUrlShow/:id' element={<EventUrlShow />}/>
        <Route path='/EventEdit/:id' element={<EventEdit />}/>
        <Route path='/EventDecision/:id' element={<EventDecision />}/>
        <Route path='/EmailSubmitAfter' element={<EmailSubmitAfter />}/>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
    </div>
  );

}

export default App;
