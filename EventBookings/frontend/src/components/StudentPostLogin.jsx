// frontend/src/components/StudentPostLogin.js
import React from 'react';
import StudentDashboard from './StudentDashboard';
import { useSelector } from 'react-redux';
function StudentPostLogin() {

  const studentId=useSelector((state)=>state.studentId);
  return (
    <div>
      <h1>Welcome Student</h1>
      <StudentDashboard studentId={studentId} />
    </div>
  );
}

export default StudentPostLogin;
