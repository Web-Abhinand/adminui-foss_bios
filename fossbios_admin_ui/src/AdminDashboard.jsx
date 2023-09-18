// src/components/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [allusers, setAllusers] = useState([]);
  const adminToken = localStorage.getItem('adminToken');

  const decodedToken = jwt_decode(adminToken);
  console.log(decodedToken);
  const adminIdemail = decodedToken.email;
  console.log(adminIdemail);
  console.log(adminToken);
  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {

    axios.get('http://127.0.0.1:8000/admin/allusers', {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }).then((response) => { console.log(response); setAllusers(response.data); })
      .catch((err) => { console.log(err); })
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
        console.log(response);
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
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredAdmins = admins.filter((admin) => admin.email !== 'superadmin@gmail.com');

  const handleApproveLeave = (user_id, index) => {
    axios.put(`http://127.0.0.1:8000/admin/approve-leave/${user_id}/${index}`, null, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((response) => {
        console.log(response);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
  }


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        <h2>Leads</h2>
        {leads.map((lead) => (
          <li key={lead._id}>
            {lead.name} - {lead.email}
            {lead.approved ? ' (Approved)' : ' (Not Approved)'}
            {!lead.approved && <button onClick={() => handleApproveLead(lead._id)}>Approve</button>}
          </li>
        ))}
      </ul>

      {adminIdemail === 'superadmin@gmail.com' && (
        <ul>
          <h2>Admin Users</h2>
          {filteredAdmins.map((admin) => (
            <li key={admin._id}>
              {admin.name} - {admin.email}
              {admin.approved ? ' (Approved)' : ' (Not Approved)'}
              {!admin.approved && <button onClick={() => handleApproveAdmin(admin._id)}>Approve</button>}
            </li>
          ))}
        </ul>
      )}
      <h2>Student Details</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Approved</th>
            <th>Date</th>
            <th>Leave Requests</th>
            <th>Reason</th>
            <th>Leave Approved</th>
          </tr>
        </thead>
        <tbody>
          {allusers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.approved ? 'Yes' : 'No'}</td>
              <td>
                {user.leaveRequests &&
                  user.leaveRequests.length > 0 &&
                  user.leaveRequests.map((leaveRequest, index) => (
                    <div key={index}>{leaveRequest.date}</div>
                  ))}
              </td>
              <td>
                {user.leaveRequests ? (
                  user.leaveRequests.length
                ) : (
                  0
                )}
              </td>
              <td>
                {user.leaveRequests &&
                  user.leaveRequests.length > 0 &&
                  user.leaveRequests.map((leaveRequest, index) => (
                    <div key={index}>
                      {leaveRequest.reason}
                    </div>
                  ))}
              </td>
              <td>
                {user.leaveRequests && user.leaveRequests.length > 0 && (
                  user.leaveRequests.map((leaveRequest, index) => (
                    <div key={index}>
                      {leaveRequest.leaveApproved ? (
                        <span>Approved</span>
                      ) : (
                        <button onClick={() => handleApproveLeave(user._id, index)}>
                          Approve Leave
                        </button>
                      )}
                    </div>
                  ))
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
