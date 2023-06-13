import { useEffect, useState } from 'react';
import '../CSS/StoreManagement.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { BASE_URL, getStores } from '../../API/api';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const Store = ({ onPageChange }) => {
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [storesPerPage, setStoresPerPage] = useState(10);

  useEffect(() => {
    getStores()
      .then(data => setStores(data.result))
      .catch(error => console.error('Error: ', error));
  }, []);

  //Get current stores
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStores = stores.slice(indexOfFirstStore, indexOfLastStore);

  //change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handlePageChange = (page) => {
    onPageChange(page);
  };
  const handleDelete = (id) => {
    fetch(`${BASE_URL}/Store/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          // Handle successful deletion
          console.log('Store deleted successfully');
          // You can also update the stores state or perform any other necessary actions
        } else {
          // Handle error case
          console.error('Error deleting store:', response.status);
          return response.json(); // Parse response body as JSON
        }
      })
      .then(data => {
        // Log the detailed error message
        console.error('Validation errors:', data);
      })
      .catch(error => {
        // Handle network error
        console.error('Network error:', error);
      });
  };
  


  return (
    <div className="main-container">
      <div className="header-container">
        <h1 className='title'>Stores</h1>
        <button className='create-link' onClick={() => handlePageChange('StoreForm')}><BsPlusCircleDotted /></button>
      </div>
      <div className="table-container">
        <table>
          <tr>

            <th>Store</th>
            <th>Store Owner</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
          {currentStores.map(store => (
            <tr key={store._id}>

              <td>{store.storeName}</td>
              <td>{store.storeOwner}</td>
              <td>{store.storeContact}</td>
              <td className='action-buttons'>
                <AiOutlineDelete onClick={() => handleDelete(store._id)}className='delete-button' />
                <AiOutlineEdit className='edit-button' />
              </td>
            </tr>

          ))}
        </table>
      </div>
      <div className="pagination">
        <Pagination
          storesPerPage={storesPerPage}
          totalStores={stores.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};
const Pagination = ({ storesPerPage, totalStores, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStores / storesPerPage); i++) {
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
export default Store;