import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminServiceListPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [facilityName, setFacilityName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [waitTime, setWaitTime] = useState('');

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

  useEffect(() => {
    fetchFacilities();
  }, []);

  const addService = async () => {
    const newService = { name: serviceName, waitTime: parseInt(waitTime) };
    try {
      await axios.post('http://localhost:5000/api/admin/services', { facilityName, services: [newService] }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      setFacilityName('');
      setServiceName('');
      setWaitTime('');
      fetchFacilities(); // Refresh the facilities list
    } catch (error) {
      console.error('Error adding service', error);
      alert('Error adding service');
    }
  };

  return (
    <div>
      <h2>Manage Services</h2>
      <input type="text" placeholder="Facility Name" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} />
      <input type="text" placeholder="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
      <input type="number" placeholder="Wait Time (minutes)" value={waitTime} onChange={(e) => setWaitTime(e.target.value)} />
      <button onClick={addService}>Add Service</button>
      <ul>
        {facilities.map(facility => (
          <li key={facility._id}>
            {facility.name}
            <ul>
              {facility.services.map(service => (
                <li key={service._id}>{service.name} - {service.waitTime} minutes</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminServiceListPage;