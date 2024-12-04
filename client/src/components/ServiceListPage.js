import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceListPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/services', {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
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
      await axios.post('http://localhost:5000/api/appointments', {
        facilityName: selectedFacility,
        serviceName: selectedService,
        appointmentDate,
        waitTime,
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      alert('Appointment booked successfully');
    } catch (error) {
      console.error('Error booking appointment', error);
      alert('Error booking appointment');
    }
  };

  return (
    <div>
      <h2>Service List</h2>
      <select onChange={(e) => setSelectedFacility(e.target.value)}>
        <option value="">Select Facility</option>
        {facilities.map(facility => (
          <option key={facility._id} value={facility.name}>{facility.name}</option>
        ))}
      </select>
      <select onChange={(e) => setSelectedService(e.target.value)}>
        <option value="">Select Service</option>
        {facilities.find(facility => facility.name === selectedFacility)?.services.map(service => (
          <option key={service._id} value={service.name}>{service.name}</option>
        ))}
      </select>
      <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
      <button onClick={bookAppointment}>Book Appointment</button>
    </div>
  );
};

export default ServiceListPage;