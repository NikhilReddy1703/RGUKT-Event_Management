// frontend/src/components/AdminPostLogin.js
import React, { useState, useEffect } from 'react';
import CreateEvent from './CreateEvent';
import EventList from './EventList';
import axios from 'axios';
import ExcelJS from 'exceljs';
import './AdminPostLogin.css';
function AdminPostLogin() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
  }, []);

  const downloadStudentsList = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/download/${eventId}`);
      const students = response.data;

      // Create Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Registered Students');

      // Add header row
      worksheet.addRow(['Name', 'Username']);

      // Add data rows
      if(students)
      students.forEach(student => {
        worksheet.addRow([student.name, student.username]);
      });

      // Generate Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      // Create a link to download the file
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'registered_students.xlsx');
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading student list', error);
    }
  };

  return (
    <>
   
    <div className="admin">
    <h1>Welcome Admin</h1>
      <CreateEvent />
      <div className="events-list">
        {events.map(event => (
          <div key={event._id} className="event">
            <h2>{event.programName}</h2>
            <p>Time: {new Date(event.time).toLocaleString()}</p>
            <p>Deadline: {new Date(event.deadline).toLocaleString()}</p>
              <button onClick={() => downloadStudentsList(event._id)}>
                Download Students List
              </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default AdminPostLogin;
