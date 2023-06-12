import '../CSS/StoreManagement.css';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle } from 'react-icons/ai';
import { getUsers } from '../../API/api';
import { useEffect, useState } from 'react';

const Clients = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data.result))
      .catch(error => console.error('Error:', error));
  }, []);
  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="main-container">
      <div className="header-container">
        <h1 className='title'>Clients</h1>
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
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_Name}</td>
                <td>{user.last_Name}</td>
                <td>{user.email}</td>
                <td className='action-buttons'>
                  <AiOutlineDelete className='delete-button' />
                  <AiOutlineEdit className='edit-button' />
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

export default Clients;
