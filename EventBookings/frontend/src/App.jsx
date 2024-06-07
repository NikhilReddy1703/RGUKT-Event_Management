// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StudentLogin from './components/StudentLogin';
import AdminLogin from './components/AdminLogin';
import LoginForm from './components/LoginForm';
import StudentPostLogin from './components/StudentPostLogin';
import AdminPostLogin from './components/AdminPostLogin';
import './App.css';
import { Provider } from 'react-redux';
import {store} from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>
      <div className="App">
        {/* <Switch> */}
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/student-login" element={<StudentLogin/>} />
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/studentpostlogin" element={<StudentPostLogin/>} />
          <Route path="/adminpostlogin" element={<AdminPostLogin/>} />
         
        {/* </Switch> */}
        </Routes>
      </div>
      </Provider>
    </Router>
  );
}

export default App;
