import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Service from './Components/Service';

function App() {
  return (
      <Router>
        <Routes>
        <Route path="/home" element={<Home/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/" element={<SignIn/>} />
          <Route path="/Service" element={<Service/>} />

        </Routes>
      </Router>
  );
}
export default App;
