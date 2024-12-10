import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminServiceListPage.css';

const AdminServiceListPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [facilityName, setFacilityName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [editingFacility, setEditingFacility] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [addingServiceFacility, setAddingServiceFacility] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch facilities from the server
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

  // Add a new service to a facility
  const addService = async () => {
    const facility = facilities.find(facility => facility.name === facilityName);
    if (facility) {
      // If facility exists, add service to the existing facility
      await addServiceToFacility(facility._id);
      return;
    }

    const newService = { name: serviceName, waitTime: parseInt(waitTime) };
    try {
      await axios.post('http://localhost:5000/api/admin/services', { facilityName, services: [newService] }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      setFacilityName('');
      setServiceName('');
      setWaitTime('');
      alert('Service added successfully');
      fetchFacilities(); // Refresh the facilities list
    } catch (error) {
      console.error('Error adding service', error);
      alert('Error adding service');
    }
  };

  // Add a service to an existing facility
  const addServiceToFacility = async (facilityId) => {
    const newService = { name: serviceName, waitTime: parseInt(waitTime) };
    try {
      const facility = facilities.find(facility => facility._id === facilityId);
      await axios.put(`http://localhost:5000/api/admin/services/${facilityId}`, {
        name: facility.name,
        services: [...facility.services, newService],
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      setServiceName('');
      setWaitTime('');
      setAddingServiceFacility(null);
      alert('Service added to facility successfully');
      fetchFacilities(); // Refresh the facilities list
    } catch (error) {
      console.error('Error adding service', error);
      alert('Error adding service');
    }
  };

  // Start editing a facility or service
  const startEditing = (facility, service) => {
    setEditingFacility(facility);
    setFacilityName(facility.name);
    if (service) {
      setEditingService(service);
      setServiceName(service.name);
      setWaitTime(service.waitTime);
    } else {
      setEditingService(null);
      setServiceName('');
      setWaitTime('');
    }
    setShowModal(true);
  };

  // Save changes to a facility or service
  const saveChanges = async () => {
    const updatedServices = editingFacility.services.map(service =>
      service._id === editingService?._id ? { ...service, name: serviceName, waitTime: parseInt(waitTime) } : service
    );

    try {
      await axios.put(`http://localhost:5000/api/admin/services/${editingFacility._id}`, {
        name: facilityName,
        services: updatedServices,
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      alert('Changes saved successfully');
      setEditingFacility(null);
      setEditingService(null);
      setFacilityName('');
      setServiceName('');
      setWaitTime('');
      setShowModal(false);
      fetchFacilities(); // Refresh the facilities list
    } catch (error) {
      console.error('Error saving changes', error);
      alert('Error saving changes');
    }
  };

  // Delete a service from a facility
  const deleteService = async (facilityId, serviceId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/services/${facilityId}/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      alert('Service deleted successfully');
      fetchFacilities(); // Refresh the facilities list
    } catch (error) {
      console.error('Error deleting service', error);
      alert('Error deleting service');
    }
  };

  // Delete a facility
  const deleteFacility = async (facilityId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/services/${facilityId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      alert('Facility deleted successfully');
      fetchFacilities(); // Refresh the facilities list
    } catch (error) {
      console.error('Error deleting facility', error);
      alert('Error deleting facility');
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingFacility(null);
    setEditingService(null);
    setFacilityName('');
    setServiceName('');
    setWaitTime('');
    setShowModal(false);
  };

  // Cancel adding a service
  const cancelAddingService = () => {
    setAddingServiceFacility(null);
    setServiceName('');
    setWaitTime('');
  };

  // Cancel adding a service
  const cancelAddService = () => {
    setFacilityName('');
    setServiceName('');
    setWaitTime('');
  };

  return (
    <div className="admin-service-list-container">
      <h2>Manage Services</h2>
      <form>
        <input type="text" placeholder="Facility Name" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} />
        <input type="text" placeholder="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
        <input type="number" placeholder="Wait Time (minutes)" value={waitTime} onChange={(e) => setWaitTime(e.target.value)} />
        {!showModal && <button type="button" onClick={addService}>Add Service</button>}
        {showModal && <button type="button" onClick={saveChanges}>Save Changes</button>}
        <button type="button" onClick={cancelAddService}>Cancel</button>
      </form>
      <h3>Available Services</h3>
      <table className="facilities-table">
        <thead>
          <tr>
            <th>Facility Name</th>
            <th>Service Name</th>
            <th>Wait Time (minutes)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map(facility => (
            facility.services.map(service => (
              <tr key={service._id}>
                <td>{facility.name}</td>
                <td>{service.name}</td>
                <td>{service.waitTime}</td>
                <td>
                  <button onClick={() => startEditing(facility, service)}>Edit</button>
                  <button onClick={() => deleteService(facility._id, service._id)}>Delete</button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>

      {/* Add a table to display facilities */}
      <h3>Facilities List</h3>
      <table className="facilities-table">
        <thead>
          <tr>
            <th>Facility Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map(facility => (
            <tr key={facility._id}>
              <td>{facility.name}</td>
              <td>
                <button onClick={() => deleteFacility(facility._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {addingServiceFacility && (
        <div className="add-service-form">
          <input
            type="text"
            placeholder="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Wait Time (minutes)"
            value={waitTime}
            onChange={(e) => setWaitTime(e.target.value)}
          />
          <button onClick={() => addServiceToFacility(addingServiceFacility)}>Add Service</button>
          <button onClick={cancelAddingService}>Cancel</button>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Facility and Services</h3>
            <input
              type="text"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
            />
            {editingService && (
              <>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
                <input
                  type="number"
                  value={waitTime}
                  onChange={(e) => setWaitTime(e.target.value)}
                />
              </>
            )}
            <button onClick={saveChanges}>Save Changes</button>
            <button onClick={cancelEditing}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServiceListPage;
