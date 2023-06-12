import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import '../CSS/StoreManagement.css';
import {BsPlusCircleDotted} from 'react-icons/bs'
import { useEffect, useState } from 'react';
import { getProducts } from '../../API/api';

const Products = ({onPageChange}) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);

    useEffect(() => {
        getProducts()
        .then(data => setProducts(data.result))
        .catch(error => console.error('Error: ', error));
    }, []);
    
    //Get current products
    const indexOfLastUser = currentPage * productsPerPage;
    const indexOfFirstUser = indexOfLastUser - productsPerPage;
    const currentProducts = products.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    function handlePageChange(page) {
        onPageChange(page);
      }
    
    return(
        <div className="main-container">
        <div className="header-container">
            <h1 className='title'>Products</h1>
            <button className='create-link' onClick={() => handlePageChange('ProductForm')}><BsPlusCircleDotted /></button>
        </div>
        <div className="table-container">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Product Image</th>
                    <th>Product</th>
                    <th>Actions</th>
                </tr>
                {products.map(product => (
                    <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td><img className='table-img' src={product.productImg} alt='img'/></td>
                    <td>{product.productName}</td>
                    <td className='action-buttons'>
                        <AiOutlineDelete className='delete-button' />
                        <AiOutlineEdit className='edit-button' />
                    </td>

                </tr>
                ))}
            </table>
        </div>
        <div className="pagination">
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div> 
    );
};
const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
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
export default Products