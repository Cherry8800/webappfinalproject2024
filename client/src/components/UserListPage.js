import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserListPage.css'; // Import the CSS file

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      // Sort users by role and then alphabetically by name
      const sortedUsers = data.sort((a, b) => {
        if (a.role === b.role) {
          return a.name.localeCompare(b.name);
        }
        return a.role.localeCompare(b.role);
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching users', error);
      alert('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    console.log('Deleting user with ID:', userId); // Log the user ID
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
      alert('Error deleting user');
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/users', { name, email, password, role }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      setName('');
      setEmail('');
      setPassword('');
      setRole('user'); // Reset role to default
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error adding user', error);
      alert('Error adding user');
    }
  };

  const editUser = (user) => {
    setEditingUserId(user._id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${editingUserId}`, { name, email, role }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
      });
      setName('');
      setEmail('');
      setPassword('');
      setRole('user'); // Reset role to default
      setEditingUserId(null);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error updating user', error);
      alert('Error updating user');
    }
  };

  return (
    <div className="user-list-container">
      <h2>Manage Users</h2>
      <form onSubmit={editingUserId ? updateUser : addUser}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required={!editingUserId} />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">{editingUserId ? 'Update User' : 'Add User'}</button>
      </form>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserListPage = () => {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user'); // Default role is 'user'
//   const [editingUserId, setEditingUserId] = useState(null);

//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/api/admin/users', {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       // Sort users by role and then alphabetically by name
//       const sortedUsers = data.sort((a, b) => {
//         if (a.role === b.role) {
//           return a.name.localeCompare(b.name);
//         }
//         return a.role.localeCompare(b.role);
//       });
//       setUsers(sortedUsers);
//     } catch (error) {
//       console.error('Error fetching users', error);
//       alert('Error fetching users');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const deleteUser = async (userId) => {
//     console.log('Deleting user with ID:', userId); // Log the user ID
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setUsers(users.filter(user => user._id !== userId));
//     } catch (error) {
//       console.error('Error deleting user', error);
//       alert('Error deleting user');
//     }
//   };

//   const addUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/admin/users', { name, email, password, role }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setName('');
//       setEmail('');
//       setPassword('');
//       setRole('user'); // Reset role to default
//       fetchUsers(); // Refresh the user list
//     } catch (error) {
//       console.error('Error adding user', error);
//       alert('Error adding user');
//     }
//   };

//   const editUser = (user) => {
//     setEditingUserId(user._id);
//     setName(user.name);
//     setEmail(user.email);
//     setRole(user.role);
//   };

//   const updateUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/admin/users/${editingUserId}`, { name, email, role }, {
//         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` },
//       });
//       setName('');
//       setEmail('');
//       setPassword('');
//       setRole('user'); // Reset role to default
//       setEditingUserId(null);
//       fetchUsers(); // Refresh the user list
//     } catch (error) {
//       console.error('Error updating user', error);
//       alert('Error updating user');
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Users</h2>
//       <form onSubmit={editingUserId ? updateUser : addUser}>
//         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required={!editingUserId} />
//         <select value={role} onChange={(e) => setRole(e.target.value)} required>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button type="submit">{editingUserId ? 'Update User' : 'Add User'}</button>
//       </form>
//       <ul>
//         {users.map(user => (
//           <li key={user._id}>
//             {user.name} - {user.email} - {user.role}
//             <button onClick={() => editUser(user)}>Edit</button>
//             <button onClick={() => deleteUser(user._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserListPage;
