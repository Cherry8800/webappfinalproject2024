import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboardPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/appointments', {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
        });
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments', error);
        alert('Error fetching appointments');
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment._id}>
            Facility: {appointment.facilityName}, Service: {appointment.serviceName}, Appointment Date: {new Date(appointment.appointmentDate).toLocaleDateString()}, Wait Time: {appointment.waitTime} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboardPage;