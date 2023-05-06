import React, {useState , useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Layout from '../components/Layout';
import axios from 'axios';

const AdminPage = ()=>{

    const [users, setUsers] = useState([
        
    ]);

    useEffect(()=>{
    fetch('http://localhost:3000/api/Admin/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(data => {
      setUsers(Object.values(data));
      
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const deleteUser = (id) =>{

    fetch(`http://localhost:3000/api/Admin/${id}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token')
  }
})
  .then(response => response.json())
  .then(data => {
    Alert(data.msg);
  })
  .catch(error => {
    console.error(error);
  });

  }

    
    return(
<Layout>
          
  <table>
    <thead>
      <tr>
        <th>User ID</th>
        <th>Email</th>
        <th>Password</th>
        <th>Role ID</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.userid}>
          <td>{user.userid}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>{user.roleid}</td>
          <td>
            <button onClick={() => deleteUser(user.userid)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

</Layout>
    )

}

export default AdminPage;