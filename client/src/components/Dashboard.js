import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const [message, setMessage] = useState(''); // State variable for messages
  const [messageType, setMessageType] = useState(''); // State variable for message type (success or error)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
          throw new Error('User not authenticated');
        }

        const { data } = await axios.get('/api/appointments', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments', error);
        setMessage('Error fetching appointments');
        setMessageType('error');
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Clear timeout if component unmounts or message changes
    }
  }, [message]);

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

      const response = await axios.put(`/api/appointments/${editingAppointment._id}`, {
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
      setMessage('Appointment updated successfully');
      setMessageType('success');
    } catch (error) {
      console.error('Error updating appointment', error);
      setMessage('Error updating appointment');
      setMessageType('error');
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      console.log('Deleting appointment ID:', appointmentId);  // Log the ID
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || !userInfo.token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.delete(`/api/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      console.log('Delete response:', response.data);
      setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
      setMessage('Appointment deleted successfully');
      setMessageType('success');
    } catch (error) {
      console.error('Error deleting appointment', error);
      setMessage('Error deleting appointment');
      setMessageType('error');
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
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard! Manage your services here.</p>
      <h3>Your Appointments</h3>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Facility Name</th>
            <th>Service Name</th>
            <th>Appointment Date</th>
            <th>Wait Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td>{appointment.facilityName}</td>
              <td>{appointment.serviceName}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td>{calculateWaitTime(appointment.appointmentDate, appointment.waitTime)}</td>
              <td>
                <button onClick={() => handleEdit(appointment)}>Edit</button>
                <button onClick={() => handleDelete(appointment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingAppointment && (
        <div className="edit-appointment">
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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/Dashboard.css';

// // Using environment variable for API base URL
// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// const Dashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [editingAppointment, setEditingAppointment] = useState(null);
//   const [newAppointmentDate, setNewAppointmentDate] = useState('');
//   const [message, setMessage] = useState(''); // State variable for messages
//   const [messageType, setMessageType] = useState(''); // State variable for message type (success or error)

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//         if (!userInfo || !userInfo.token) {
//           throw new Error('User not authenticated');
//         }

//         const { data } = await axios.get(`${apiBaseUrl}/api/appointments`, {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         });
//         setAppointments(data);
//       } catch (error) {
//         console.error('Error fetching appointments', error);
//         setMessage('Error fetching appointments');
//         setMessageType('error');
//       }
//     };
//     fetchAppointments();
//   }, []);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         setMessage('');
//         setMessageType('');
//       }, 5000); // Clear message after 5 seconds

//       return () => clearTimeout(timer); // Clear timeout if component unmounts or message changes
//     }
//   }, [message]);

//   const handleEdit = (appointment) => {
//     setEditingAppointment(appointment);
//     setNewAppointmentDate(appointment.appointmentDate.split('T')[0]);
//   };

//   const handleUpdate = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//       if (!userInfo || !userInfo.token) {
//         throw new Error('User not authenticated');
//       }

//       console.log(`Updating appointment ID: ${editingAppointment._id} with new date: ${newAppointmentDate}`);

//       const response = await axios.put(`${apiBaseUrl}/api/appointments/${editingAppointment._id}`, {
//         appointmentDate: newAppointmentDate,
//       }, {
//         headers: { Authorization: `Bearer ${userInfo.token}` },
//       });

//       console.log('Update response:', response.data);

//       setAppointments(appointments.map(appointment =>
//         appointment._id === editingAppointment._id
//           ? { ...appointment, appointmentDate: newAppointmentDate }
//           : appointment
//       ));
//       setEditingAppointment(null);
//       setNewAppointmentDate('');
//       setMessage('Appointment updated successfully');
//       setMessageType('success');
//     } catch (error) {
//       console.error('Error updating appointment', error);
//       setMessage('Error updating appointment');
//       setMessageType('error');
//     }
//   };

//   const handleDelete = async (appointmentId) => {
//     try {
//       console.log('Deleting appointment ID:', appointmentId);  // Log the ID
//       const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//       if (!userInfo || !userInfo.token) {
//         throw new Error('User not authenticated');
//       }

//       const response = await axios.delete(`${apiBaseUrl}/api/appointments/${appointmentId}`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` },
//       });

//       console.log('Delete response:', response.data);
//       setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
//       setMessage('Appointment deleted successfully');
//       setMessageType('success');
//     } catch (error) {
//       console.error('Error deleting appointment', error);
//       setMessage('Error deleting appointment');
//       setMessageType('error');
//     }
//   };

//   const calculateWaitTime = (appointmentDate, waitTime) => {
//     const appointmentDateTime = new Date(appointmentDate);
//     const currentDateTime = new Date();
//     const totalWaitTimeInMinutes = waitTime + Math.floor((appointmentDateTime - currentDateTime) / 60000);
//     const days = Math.floor(totalWaitTimeInMinutes / (24 * 60));
//     const hours = Math.floor((totalWaitTimeInMinutes % (24 * 60)) / 60);
//     const minutes = totalWaitTimeInMinutes % 60;
//     return `${days} days, ${hours} hours, and ${minutes} minutes`;
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <p>Welcome to your dashboard! Manage your services here.</p>
//       <h3>Your Appointments</h3>
//       {message && (
//         <div className={`message ${messageType}`}>
//           {message}
//         </div>
//       )}
//       <table className="appointments-table">
//         <thead>
//           <tr>
//             <th>Facility Name</th>
//             <th>Service Name</th>
//             <th>Appointment Date</th>
//             <th>Wait Time</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {appointments.map(appointment => (
//             <tr key={appointment._id}>
//               <td>{appointment.facilityName}</td>
//               <td>{appointment.serviceName}</td>
//               <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
//               <td>{calculateWaitTime(appointment.appointmentDate, appointment.waitTime)}</td>
//               <td>
//                 <button onClick={() => handleEdit(appointment)}>Edit</button>
//                 <button onClick={() => handleDelete(appointment._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editingAppointment && (
//         <div className="edit-appointment">
//           <h3>Edit Appointment</h3>
//           <input
//             type="date"
//             value={newAppointmentDate}
//             onChange={(e) => setNewAppointmentDate(e.target.value)}
//           />
//           <button onClick={handleUpdate}>Update</button>
//           <button onClick={() => setEditingAppointment(null)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
