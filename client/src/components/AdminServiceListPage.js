import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminServiceListPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [facilityName, setFacilityName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [editingFacility, setEditingFacility] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [addingServiceFacility, setAddingServiceFacility] = useState(null);

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
      fetchFacilities(); // Refresh the facilities list
    } catch (error) {
      console.error('Error adding service', error);
      alert('Error adding service');
    }
  };

  const startEditing = (facility, service) => {
    setEditingFacility(facility);
    if (service) {
      setEditingService(service);
      setServiceName(service.name);
      setWaitTime(service.waitTime);
    } else {
      setEditingService(null);
      setFacilityName(facility.name);
      setServiceName('');
      setWaitTime('');
    }
  };

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
      fetchFacilities(); // Refresh the facilities list
    } catch (error) {
      console.error('Error saving changes', error);
      alert('Error saving changes');
    }
  };

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
            <button onClick={() => setAddingServiceFacility(facility._id)}>Add Service</button>
            <button onClick={() => startEditing(facility)}>Edit Facility</button>
            <button onClick={() => deleteFacility(facility._id)}>Delete Facility</button>
            <ul>
              {facility.services.map(service => (
                <li key={service._id}>
                  {service.name} - {service.waitTime} minutes 
                  <button onClick={() => startEditing(facility, service)}>Edit Service</button>
                  <button onClick={() => deleteService(facility._id, service._id)}>Delete Service</button>
                </li>
              ))}
            </ul>
            {addingServiceFacility === facility._id && (
              <div>
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
                <button onClick={() => addServiceToFacility(facility._id)}>Add Service</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {editingFacility && (
        <div>
          <h3>Edit Facility and Services</h3>
          {!editingService && (
            <input
              type="text"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
            />
          )}
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
        </div>
      )}
    </div>
  );
};

export default AdminServiceListPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminServiceListPage = () => {
//   const [facilities, setFacilities] = useState([]);
//   const [facilityName, setFacilityName] = useState('');
//   const [serviceName, setServiceName] = useState('');
//   const [waitTime, setWaitTime] = useState('');
//   const [editingFacility, setEditingFacility] = useState(null);
//   const [editingService, setEditingService] = useState(null);

//   const fetchFacilities = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/api/admin/services', {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setFacilities(data);
//     } catch (error) {
//       console.error('Error fetching facilities', error);
//       alert('Error fetching facilities');
//     }
//   };

//   useEffect(() => {
//     fetchFacilities();
//   }, []);

//   const addService = async () => {
//     const newService = { name: serviceName, waitTime: parseInt(waitTime) };
//     try {
//       await axios.post('http://localhost:5000/api/admin/services', { facilityName, services: [newService] }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setFacilityName('');
//       setServiceName('');
//       setWaitTime('');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error adding service', error);
//       alert('Error adding service');
//     }
//   };

//   const startEditing = (facility, service) => {
//     setEditingFacility(facility);
//     if (service) {
//       setEditingService(service);
//       setServiceName(service.name);
//       setWaitTime(service.waitTime);
//     } else {
//       setEditingService(null);
//       setFacilityName(facility.name);
//       setServiceName('');
//       setWaitTime('');
//     }
//   };

//   const saveChanges = async () => {
//     const updatedServices = editingFacility.services.map(service =>
//       service._id === editingService?._id ? { ...service, name: serviceName, waitTime: parseInt(waitTime) } : service
//     );

//     try {
//       await axios.put(`http://localhost:5000/api/admin/services/${editingFacility._id}`, {
//         name: facilityName,
//         services: updatedServices,
//       }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       alert('Changes saved successfully');
//       setEditingFacility(null);
//       setEditingService(null);
//       setFacilityName('');
//       setServiceName('');
//       setWaitTime('');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error saving changes', error);
//       alert('Error saving changes');
//     }
//   };

//   const deleteService = async (facilityId, serviceId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/services/${facilityId}/services/${serviceId}`, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       alert('Service deleted successfully');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error deleting service', error);
//       alert('Error deleting service');
//     }
//   };

//   const deleteFacility = async (facilityId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/services/${facilityId}`, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       alert('Facility deleted successfully');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error deleting facility', error);
//       alert('Error deleting facility');
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Services</h2>
//       <input type="text" placeholder="Facility Name" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} />
//       <input type="text" placeholder="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
//       <input type="number" placeholder="Wait Time (minutes)" value={waitTime} onChange={(e) => setWaitTime(e.target.value)} />
//       <button onClick={addService}>Add Service</button>
//       <ul>
//         {facilities.map(facility => (
//           <li key={facility._id}>
//             {facility.name} 
//             <button onClick={() => startEditing(facility)}>Edit Facility</button>
//             <button onClick={() => deleteFacility(facility._id)}>Delete Facility</button>
//             <ul>
//               {facility.services.map(service => (
//                 <li key={service._id}>
//                   {service.name} - {service.waitTime} minutes 
//                   <button onClick={() => startEditing(facility, service)}>Edit Service</button>
//                   <button onClick={() => deleteService(facility._id, service._id)}>Delete Service</button>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>

//       {editingFacility && (
//         <div>
//           <h3>Edit Facility and Services</h3>
//           {!editingService && (
//             <input
//               type="text"
//               value={facilityName}
//               onChange={(e) => setFacilityName(e.target.value)}
//             />
//           )}
//           {editingService && (
//             <>
//               <input
//                 type="text"
//                 value={serviceName}
//                 onChange={(e) => setServiceName(e.target.value)}
//               />
//               <input
//                 type="number"
//                 value={waitTime}
//                 onChange={(e) => setWaitTime(e.target.value)}
//               />
//             </>
//           )}
//           <button onClick={saveChanges}>Save Changes</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminServiceListPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminServiceListPage = () => {
//   const [facilities, setFacilities] = useState([]);
//   const [facilityName, setFacilityName] = useState('');
//   const [serviceName, setServiceName] = useState('');
//   const [waitTime, setWaitTime] = useState('');
//   const [editingFacility, setEditingFacility] = useState(null);
//   const [editingService, setEditingService] = useState(null);

//   const fetchFacilities = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/api/admin/services', {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setFacilities(data);
//     } catch (error) {
//       console.error('Error fetching facilities', error);
//       alert('Error fetching facilities');
//     }
//   };

//   useEffect(() => {
//     fetchFacilities();
//   }, []);

//   const addService = async () => {
//     const newService = { name: serviceName, waitTime: parseInt(waitTime) };
//     try {
//       await axios.post('http://localhost:5000/api/admin/services', { facilityName, services: [newService] }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setFacilityName('');
//       setServiceName('');
//       setWaitTime('');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error adding service', error);
//       alert('Error adding service');
//     }
//   };

//   const startEditing = (facility, service) => {
//     setEditingFacility(facility);
//     setFacilityName(facility.name);
//     if (service) {
//       setEditingService(service);
//       setServiceName(service.name);
//       setWaitTime(service.waitTime);
//     } else {
//       setEditingService(null);
//       setServiceName('');
//       setWaitTime('');
//     }
//   };

//   const saveChanges = async () => {
//     const updatedServices = editingFacility.services.map(service =>
//       service._id === editingService?._id ? { ...service, name: serviceName, waitTime: parseInt(waitTime) } : service
//     );

//     try {
//       await axios.put(`http://localhost:5000/api/admin/services/${editingFacility._id}`, {
//         name: facilityName,
//         services: updatedServices,
//       }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       alert('Changes saved successfully');
//       setEditingFacility(null);
//       setEditingService(null);
//       setFacilityName('');
//       setServiceName('');
//       setWaitTime('');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error saving changes', error);
//       alert('Error saving changes');
//     }
//   };

//   const deleteService = async (facilityId, serviceId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/services/${facilityId}/services/${serviceId}`, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       alert('Service deleted successfully');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error deleting service', error);
//       alert('Error deleting service');
//     }
//   };

//   const deleteFacility = async (facilityId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/services/${facilityId}`, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       alert('Facility deleted successfully');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error deleting facility', error);
//       alert('Error deleting facility');
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Services</h2>
//       <input type="text" placeholder="Facility Name" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} />
//       <input type="text" placeholder="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
//       <input type="number" placeholder="Wait Time (minutes)" value={waitTime} onChange={(e) => setWaitTime(e.target.value)} />
//       <button onClick={addService}>Add Service</button>
//       <ul>
//         {facilities.map(facility => (
//           <li key={facility._id}>
//             {facility.name} 
//             <button onClick={() => startEditing(facility)}>Edit Facility</button>
//             <button onClick={() => deleteFacility(facility._id)}>Delete Facility</button>
//             <ul>
//               {facility.services.map(service => (
//                 <li key={service._id}>
//                   {service.name} - {service.waitTime} minutes 
//                   <button onClick={() => startEditing(facility, service)}>Edit Service</button>
//                   <button onClick={() => deleteService(facility._id, service._id)}>Delete Service</button>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>

//       {editingFacility && (
//         <div>
//           <h3>Edit Facility and Services</h3>
//           <input
//             type="text"
//             value={facilityName}
//             onChange={(e) => setFacilityName(e.target.value)}
//           />
//           {editingService && (
//             <>
//               <input
//                 type="text"
//                 value={serviceName}
//                 onChange={(e) => setServiceName(e.target.value)}
//               />
//               <input
//                 type="number"
//                 value={waitTime}
//                 onChange={(e) => setWaitTime(e.target.value)}
//               />
//             </>
//           )}
//           <button onClick={saveChanges}>Save Changes</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminServiceListPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminServiceListPage = () => {
//   const [facilities, setFacilities] = useState([]);
//   const [facilityName, setFacilityName] = useState('');
//   const [serviceName, setServiceName] = useState('');
//   const [waitTime, setWaitTime] = useState('');
//   const [editingFacility, setEditingFacility] = useState(null);
//   const [editingService, setEditingService] = useState(null);

//   const fetchFacilities = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/api/admin/services', {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setFacilities(data);
//     } catch (error) {
//       console.error('Error fetching facilities', error);
//       alert('Error fetching facilities');
//     }
//   };

//   useEffect(() => {
//     fetchFacilities();
//   }, []);

//   const addService = async () => {
//     const newService = { name: serviceName, waitTime: parseInt(waitTime) };
//     try {
//       await axios.post('http://localhost:5000/api/admin/services', { facilityName, services: [newService] }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setFacilityName('');
//       setServiceName('');
//       setWaitTime('');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error adding service', error);
//       alert('Error adding service');
//     }
//   };

//   const startEditing = (facility, service) => {
//     setEditingFacility(facility);
//     setFacilityName(facility.name);
//     if (service) {
//       setEditingService(service);
//       setServiceName(service.name);
//       setWaitTime(service.waitTime);
//     } else {
//       setEditingService(null);
//       setServiceName('');
//       setWaitTime('');
//     }
//   };

//   const saveChanges = async () => {
//     const updatedServices = editingFacility.services.map(service =>
//       service._id === editingService?._id ? { ...service, name: serviceName, waitTime: parseInt(waitTime) } : service
//     );

//     try {
//       await axios.put(`http://localhost:5000/api/admin/services/${editingFacility._id}`, {
//         name: facilityName,
//         services: updatedServices,
//       }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       alert('Changes saved successfully');
//       setEditingFacility(null);
//       setEditingService(null);
//       setFacilityName('');
//       setServiceName('');
//       setWaitTime('');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error saving changes', error);
//       alert('Error saving changes');
//     }
//   };

//   const deleteService = async (facilityId, serviceId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/services/${facilityId}/services/${serviceId}`, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       alert('Service deleted successfully');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error deleting service', error);
//       alert('Error deleting service');
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Services</h2>
//       <input type="text" placeholder="Facility Name" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} />
//       <input type="text" placeholder="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
//       <input type="number" placeholder="Wait Time (minutes)" value={waitTime} onChange={(e) => setWaitTime(e.target.value)} />
//       <button onClick={addService}>Add Service</button>
//       <ul>
//         {facilities.map(facility => (
//           <li key={facility._id}>
//             {facility.name}
//             <ul>
//               {facility.services.map(service => (
//                 <li key={service._id}>
//                   {service.name} - {service.waitTime} minutes 
//                   <button onClick={() => startEditing(facility, service)}>Edit</button>
//                   <button onClick={() => deleteService(facility._id, service._id)}>Delete</button>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>

//       {editingFacility && (
//         <div>
//           <h3>Edit Facility and Services</h3>
//           <input
//             type="text"
//             value={facilityName}
//             onChange={(e) => setFacilityName(e.target.value)}
//           />
//           {editingService && (
//             <>
//               <input
//                 type="text"
//                 value={serviceName}
//                 onChange={(e) => setServiceName(e.target.value)}
//               />
//               <input
//                 type="number"
//                 value={waitTime}
//                 onChange={(e) => setWaitTime(e.target.value)}
//               />
//             </>
//           )}
//           <button onClick={saveChanges}>Save Changes</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminServiceListPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminServiceListPage = () => {
//   const [facilities, setFacilities] = useState([]);
//   const [facilityName, setFacilityName] = useState('');
//   const [serviceName, setServiceName] = useState('');
//   const [waitTime, setWaitTime] = useState('');
//   const [editingFacility, setEditingFacility] = useState(null);
//   const [editingService, setEditingService] = useState(null);

//   const fetchFacilities = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/api/admin/services', {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setFacilities(data);
//     } catch (error) {
//       console.error('Error fetching facilities', error);
//       alert('Error fetching facilities');
//     }
//   };

//   useEffect(() => {
//     fetchFacilities();
//   }, []);

//   const addService = async () => {
//     const newService = { name: serviceName, waitTime: parseInt(waitTime) };
//     try {
//       await axios.post('http://localhost:5000/api/admin/services', { facilityName, services: [newService] }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setFacilityName('');
//       setServiceName('');
//       setWaitTime('');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error adding service', error);
//       alert('Error adding service');
//     }
//   };

//   const startEditing = (facility, service) => {
//     setEditingFacility(facility);
//     setFacilityName(facility.name);
//     if (service) {
//       setEditingService(service);
//       setServiceName(service.name);
//       setWaitTime(service.waitTime);
//     } else {
//       setEditingService(null);
//       setServiceName('');
//       setWaitTime('');
//     }
//   };

//   const saveChanges = async () => {
//     const updatedServices = editingFacility.services.map(service =>
//       service._id === editingService?._id ? { ...service, name: serviceName, waitTime: parseInt(waitTime) } : service
//     );

//     try {
//       await axios.put(`http://localhost:5000/api/admin/services/${editingFacility._id}`, {
//         name: facilityName,
//         services: updatedServices,
//       }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       alert('Changes saved successfully');
//       setEditingFacility(null);
//       setEditingService(null);
//       setFacilityName('');
//       setServiceName('');
//       setWaitTime('');
//       fetchFacilities(); // Refresh the facilities list
//     } catch (error) {
//       console.error('Error saving changes', error);
//       alert('Error saving changes');
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Services</h2>
//       <input type="text" placeholder="Facility Name" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} />
//       <input type="text" placeholder="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
//       <input type="number" placeholder="Wait Time (minutes)" value={waitTime} onChange={(e) => setWaitTime(e.target.value)} />
//       <button onClick={addService}>Add Service</button>
//       <ul>
//         {facilities.map(facility => (
//           <li key={facility._id}>
//             {facility.name}
//             <ul>
//               {facility.services.map(service => (
//                 <li key={service._id}>
//                   {service.name} - {service.waitTime} minutes <button onClick={() => startEditing(facility, service)}>Edit</button>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>

//       {editingFacility && (
//         <div>
//           <h3>Edit Facility and Services</h3>
//           <input
//             type="text"
//             value={facilityName}
//             onChange={(e) => setFacilityName(e.target.value)}
//           />
//           {editingService && (
//             <>
//               <input
//                 type="text"
//                 value={serviceName}
//                 onChange={(e) => setServiceName(e.target.value)}
//               />
//               <input
//                 type="number"
//                 value={waitTime}
//                 onChange={(e) => setWaitTime(e.target.value)}
//               />
//             </>
//           )}
//           <button onClick={saveChanges}>Save Changes</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminServiceListPage;
