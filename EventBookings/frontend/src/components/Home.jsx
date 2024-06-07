// frontend/src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="home">
      <h1>Welcome to the Home Page</h1>
      <div className="cards">
        <div className="card" onClick={() => navigateTo('/student-login')}>
          <h2>Student</h2>
          <p>Login as a Student</p>
        </div>
        <div className="card" onClick={() => navigateTo('/admin-login')}>
          <h2>Admin</h2>
          <p>Login as an Admin</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
