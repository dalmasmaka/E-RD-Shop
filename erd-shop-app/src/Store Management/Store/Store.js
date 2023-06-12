import { useEffect, useState } from 'react';
import '../CSS/StoreManagement.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { getStores } from '../../API/api';

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

    function handlePageChange(page) {
        onPageChange(page);
    }

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
                    </tr>
                    {stores.map(store => (
                        <tr key={store._id}>
                         
                            <td>{store.storeName}</td>
                            <td>{store.storeOwner}</td>
                            <td>{store.storeContact}</td>
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