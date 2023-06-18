import '../CSS/StoreManagement.css';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle } from 'react-icons/ai';
import { BASE_URL, getUsers } from '../../API/api';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Users = ({onInfo }) => {
  const [users, setUsers] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data.result))
      .catch(error => console.error('Error:', error));
  }, []);
  const handleInfo = (user) => {
    setSelectedClient(user);
    onInfo("UserForm", null, null, null, null, user);
  }
  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete users',
      text: 'Are you sure you want to delete this user?',
      icon:'warning',
      showCancelButton : true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed){
        const url = `${BASE_URL}/Authentication/${id}`;
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({})
        })
        .then(response => {
          if(response.ok){
            window.location.reload(); // Reload the current page
          } else{
            console.error('Error deleting user:', response.status);
            if(response.status === 400){
              return response.json();
            }else{
              throw new Error('Unexpected error occurred!');
            }
          }
        })
        .then(data => {
          if(data && data.errors){
            console.error('Validation errors: ', data.errors);
          }
        })
        .catch(error => {
          console.log('Error: ', error);
        });
      }
    });
  };
  return (
    <div className="main-container">
      <div className="header-container">
        <h1 className='title'>Users</h1>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_Name}</td>
                <td>{user.last_Name}</td>
                <td>{user.email}</td>
                <td className='action-buttons'>
                  <AiOutlineDelete className='delete-button' onClick={() => handleDelete(user.id)}/>
                  <AiOutlineInfoCircle className='edit-button' onClick={() => handleInfo(user)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

const Pagination = ({ usersPerPage, totalUsers, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map(number => (
        <li key={number}>
          <button
            className={currentPage === number ? 'active' : ''}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Users;
