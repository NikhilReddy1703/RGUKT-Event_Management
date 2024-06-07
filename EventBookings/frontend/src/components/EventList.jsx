// frontend/src/components/EventList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventList() {
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

  const downloadStudentList = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/download/${eventId}`);
      // Handle the download of the student list
      console.log(response.data);
    } catch (error) {
      console.error('Error downloading student list', error);
    }
  };

  return (
    <div className="event-list">
      <h1>Event List</h1>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <p>{event.programName}</p>
            <p>{new Date(event.time).toLocaleString()}</p>
            <p>{new Date(event.deadline).toLocaleString()}</p>
            {new Date() > new Date(event.deadline) && (
              <button onClick={() => downloadStudentList(event._id)}>
                Download Student List
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
