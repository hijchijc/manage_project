import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.less'
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/*' element={<Admin/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
