import { useEffect, useState } from 'react';
import '../CSS/StoreManagement.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { BASE_URL, getStores } from '../../API/api';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import StoreForm from "../Store/StoreForm";

const Store = ({ onPageChange, onEdit }) => {
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [storesPerPage, setStoresPerPage] = useState(10);
  const [selectedStore, setSelectedStore] = useState(null);
  const handleEdit = (store) => {
    setSelectedStore(store);
    onEdit("StoreForm", store);
  };




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
    Swal.fire({
      title: 'Delete Store',
      text: 'Are you sure you want to delete this store?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${BASE_URL}/Store/${id}`;
  
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}) // Add an empty request body
        })
          .then(response => {
            if (response.ok) {
              window.location.reload();
             
            } else {
              // Handle error case
              console.error('Error deleting store:', response.status);
              if (response.status === 400) {
                return response.json(); // Parse response body as JSON
              } else {
                throw new Error('Unexpected error occurred');
              }
            }
          })
          .then(data => {
            // Check for validation errors
            if (data && data.errors) {
              console.error('Validation errors:', data.errors);
            }
          })
          .catch(error => {
            // Handle network error or unexpected error
            console.error('Error:', error);
          });
      }
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
                <AiOutlineDelete onClick={() => handleDelete(store.storeId)}className='delete-button' />
                <AiOutlineEdit  onClick={() => handleEdit(store)} className='edit-button' />
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