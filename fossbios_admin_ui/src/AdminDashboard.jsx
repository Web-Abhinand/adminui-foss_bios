// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [admins, setAdmins] = useState([]);
  const adminToken = localStorage.getItem('adminToken'); // Retrieve admin token from local storage
  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchLeads = () => {
    axios.get('http://127.0.0.1:8000/admin/leads', {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((response) => {
        setLeads(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const fetchAdmins = () => {
    axios.get('http://127.0.0.1:8000/admin/admins', {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('adminToken');

    // Redirect to the login page
    window.location.replace('/admin-login');
  };


  const handleApproveLead = (leadId) => {
    // Send a request to the server to approve the lead
    axios.put(`http://127.0.0.1:8000/admin/approve-lead/${leadId}`, null, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((response) => {
        // Update the leads list after approval
        fetchLeads();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleApproveAdmin = (adminId) => {
    // Send a request to the server to approve the admin
    axios.put(`http://127.0.0.1:8000/admin/approve-admin/${adminId}`, null, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((response) => {
        // Update the admins list after approval
        fetchAdmins();
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {leads.map((lead) => (
          <li key={lead._id}>
            {lead.name} - {lead.email}
            {lead.approved ? ' (Approved)' : ' (Not Approved)'}
            {!lead.approved && <button onClick={() => handleApproveLead(lead._id)}>Approve</button>}
          </li>
        ))}
      </ul>
      <h2>Admin Users</h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>
            {admin.name} - {admin.email}
            {admin.approved ? ' (Approved)' : ' (Not Approved)'}
            {!admin.approved && <button onClick={() => handleApproveAdmin(admin._id)}>Approve</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
