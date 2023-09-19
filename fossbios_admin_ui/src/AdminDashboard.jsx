// AdminDashboard.jsx
import  { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Header from './Header';
import styles from './AdminDashboard.module.css'
import Avatar from './assets/avatar.svg'

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [allusers, setAllusers] = useState([]);
  const [Email,setEmail]=useState('');
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
    setEmail(adminIdemail);
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/admin/allusers', {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
    .then((response) => { console.log(response); setAllusers(response.data); })
    .catch((err) => { console.log(err); });
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
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
    <Header handleLogout={handleLogout} />
    <div className={styles.container}>
      <div>
        <div style={{width:'15%',margin:'1rem auto'}}>
          <img src={Avatar} alt="avatar" />
          <h1 className={styles.heading} style={{textAlign:'center'}}>{Email}</h1>
        </div>
        <ul className={styles.listContainer} style={{width:'60%',margin:'2rem auto'}}>
          <h2 className={styles.listHeading}>Leads Details</h2>
          {leads.map((lead) => (
            <li className={styles.listItem} key={lead._id}>
              {lead.name} - {lead.email}
              {lead.approved ? <span className={styles.approvedText}> (Approved)</span> : (
      <span className={styles.notApprovedText}> (Not Approved)</span>
    )}
              {!lead.approved && (
                <button
                  className={styles.approveButton}
                  onClick={() => handleApproveLead(lead._id)}
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>

        {adminIdemail === 'superadmin@gmail.com' && (
          <ul className={styles.listContainer}>
            <h2 className={styles.listHeading}>Admin Users</h2>
            {filteredAdmins.map((admin) => (
              <li className={styles.listItem} key={admin._id}>
                {admin.name} - {admin.email}
                {admin.approved ? ' (Approved)' : ' (Not Approved)'}
                {!admin.approved && (
                  <button
                    className={styles.approveButton}
                    onClick={() => handleApproveAdmin(admin._id)}
                  >
                    Approve
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        <h2 className={styles.listHeading} style={{textAlign:'left',width:'57%',margin:'0 auto',paddingBottom:'1rem'}}>Student Details</h2>
        <div className={styles.tableContainer}>
          <table>
            <thead style={{padding:'1rem'}}>
              <tr className={styles.tableHeader} style={{padding:'1rem'}}>
                <th style={{padding:'1rem'}}>Name</th>
                <th style={{padding:'1rem'}}>Email</th>
                <th style={{padding:'1rem'}}>Role</th>
                <th style={{padding:'1rem'}}>Approved</th>
                <th style={{padding:'1rem'}}>Date</th>
                <th style={{padding:'1rem'}}>Leave Requests</th>
                <th style={{padding:'1rem'}}>Reason</th>
                <th style={{padding:'1rem'}}>Leave Approved</th>
              </tr>
            </thead>
            <tbody>
              {allusers.map((user) => (
                <tr className={styles.tableRow} key={user._id} style={{padding:'1rem'}}>
                  <td style={{padding:'1rem'}}>{user.name}</td>
                  <td style={{padding:'1rem'}}>{user.email}</td>
                  <td style={{padding:'1rem'}}>{user.role}</td>
                  <td style={{padding:'1rem'}}>{user.approved ? 'Yes' : 'No'}</td>
                  <td style={{padding:'1rem'}}>
                    {user.leaveRequests &&
                      user.leaveRequests.length > 0 &&
                      user.leaveRequests.map((leaveRequest, index) => (
                        <div key={index}>{leaveRequest.date}</div>
                      ))}
                  </td>
                  <td style={{padding:'1rem'}}>
                    {user.leaveRequests ? (
                      user.leaveRequests.length
                    ) : (
                      0
                    )}
                  </td>
                  <td style={{padding:'1rem'}}>
                    {user.leaveRequests &&
                      user.leaveRequests.length > 0 &&
                      user.leaveRequests.map((leaveRequest, index) => (
                        <div key={index}>
                          {leaveRequest.reason}
                        </div>
                      ))}
                  </td>
                  <td style={{padding:'1rem'}}>
                    {user.leaveRequests && user.leaveRequests.length > 0 && (
                      user.leaveRequests.map((leaveRequest, index) => (
                        <div key={index}>
                          {leaveRequest.leaveApproved ? (
                            <span className={styles.approvedLabel}>Approved</span>
                          ) : (
                            <button
                              className={styles.approveButton}
                              onClick={() => handleApproveLeave(user._id, index)}
                            >
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
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
