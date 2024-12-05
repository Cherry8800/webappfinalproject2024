import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
          throw new Error('User not authenticated');
        }

        const { data } = await axios.get('http://localhost:5000/api/appointments', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments', error);
        alert('Error fetching appointments');
      }
    };
    fetchAppointments();
  }, []);

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setNewAppointmentDate(appointment.appointmentDate.split('T')[0]);
  };

  const handleUpdate = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || !userInfo.token) {
        throw new Error('User not authenticated');
      }

      console.log(`Updating appointment ID: ${editingAppointment._id} with new date: ${newAppointmentDate}`);

      const response = await axios.put(`http://localhost:5000/api/appointments/${editingAppointment._id}`, {
        appointmentDate: newAppointmentDate,
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      console.log('Update response:', response.data);

      setAppointments(appointments.map(appointment =>
        appointment._id === editingAppointment._id
          ? { ...appointment, appointmentDate: newAppointmentDate }
          : appointment
      ));
      setEditingAppointment(null);
      setNewAppointmentDate('');
    } catch (error) {
      console.error('Error updating appointment', error);
      alert('Error updating appointment');
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || !userInfo.token) {
        throw new Error('User not authenticated');
      }

      await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment', error);
      alert('Error deleting appointment');
    }
  };

  const calculateWaitTime = (appointmentDate, waitTime) => {
    const appointmentDateTime = new Date(appointmentDate);
    const currentDateTime = new Date();
    const totalWaitTimeInMinutes = waitTime + Math.floor((appointmentDateTime - currentDateTime) / 60000);
    const days = Math.floor(totalWaitTimeInMinutes / (24 * 60));
    const hours = Math.floor((totalWaitTimeInMinutes % (24 * 60)) / 60);
    const minutes = totalWaitTimeInMinutes % 60;
    return `${days} days, ${hours} hours, and ${minutes} minutes`;
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard! Manage your services here.</p>
      <h3>Your Appointments</h3>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment._id}>
            <strong>{appointment.facilityName}</strong> - {appointment.serviceName} on {new Date(appointment.appointmentDate).toLocaleDateString()} (Wait time: {calculateWaitTime(appointment.appointmentDate, appointment.waitTime)})
            <button onClick={() => handleEdit(appointment)}>Edit</button>
            <button onClick={() => handleDelete(appointment._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingAppointment && (
        <div>
          <h3>Edit Appointment</h3>
          <input
            type="date"
            value={newAppointmentDate}
            onChange={(e) => setNewAppointmentDate(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingAppointment(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
