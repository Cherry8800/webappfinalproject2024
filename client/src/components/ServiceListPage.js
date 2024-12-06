import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ServiceListPage.css';

const ServiceListPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
          throw new Error('User not authenticated');
        }

        const { data } = await axios.get('http://localhost:5000/api/users/facilities', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setFacilities(data);
      } catch (error) {
        console.error('Error fetching facilities', error);
        alert('Error fetching facilities');
      }
    };
    fetchFacilities();
  }, []);

  const bookAppointment = async () => {
    const selectedFacilityObj = facilities.find(facility => facility.name === selectedFacility);
    const selectedServiceObj = selectedFacilityObj.services.find(service => service.name === selectedService);
    const waitTime = selectedServiceObj.waitTime;

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || !userInfo.token) {
        throw new Error('User not authenticated');
      }

      await axios.post('http://localhost:5000/api/appointments', {
        facilityName: selectedFacility,
        serviceName: selectedService,
        appointmentDate,
        waitTime,
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      // Calculate the wait time in days, hours, and minutes
      const appointmentDateTime = new Date(appointmentDate);
      const currentDateTime = new Date();
      const totalWaitTimeInMinutes = waitTime + Math.floor((appointmentDateTime - currentDateTime) / 60000);
      const days = Math.floor(totalWaitTimeInMinutes / (24 * 60));
      const hours = Math.floor((totalWaitTimeInMinutes % (24 * 60)) / 60);
      const minutes = totalWaitTimeInMinutes % 60;

      setSuccessMessage(`Appointment booked successfully at ${selectedFacility} for ${selectedService}. Wait time: ${days} days, ${hours} hours, and ${minutes} minutes.`);
      setTimeout(() => setSuccessMessage(''), 5000); // Clear the message after 5 seconds
    } catch (error) {
      console.error('Error booking appointment', error);
      alert('Error booking appointment');
    }
  };

  return (
    <div className="service-list-container">
      <h2>Book Appointment</h2>
      <select onChange={(e) => setSelectedFacility(e.target.value)}>
        <option value="">Select Facility</option>
        {facilities.map(facility => (
          <option key={facility._id} value={facility.name}>{facility.name}</option>
        ))}
      </select>
      <select onChange={(e) => setSelectedService(e.target.value)} disabled={!selectedFacility}>
        <option value="">Select Service</option>
        {facilities.find(facility => facility.name === selectedFacility)?.services.map(service => (
          <option key={service._id} value={service.name}>{service.name}</option>
        ))}
      </select>
      <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
      <button onClick={bookAppointment}>Book Appointment</button>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <h2>Available Facilities and Services</h2>
      <table className="facilities-table">
        <thead>
          <tr>
            <th>Facility Name</th>
            <th>Service Name</th>
            <th>Wait Time (minutes)</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map(facility => (
            facility.services.map(service => (
              <tr key={service._id}>
                <td>{facility.name}</td>
                <td>{service.name}</td>
                <td>{service.waitTime}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceListPage;
