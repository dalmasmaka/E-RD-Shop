import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import '../CSS/StoreManagement.css';
import { BsPlusCircleDotted } from 'react-icons/bs'
import { useEffect, useState } from 'react';
import { BASE_URL, getProducts } from '../../API/api';
import Swal from 'sweetalert2';

const Products = ({ onPageChange, onEdit }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //Handle Edit Form 
  const handleEdit = (product) => {
    setSelectedProduct(product);
    onEdit("ProductForm", null, null, product);
  };
  //API Fetch for Products
  useEffect(() => {
    getProducts()
      .then(data => setProducts(data.result))
      .catch(error => console.error('Error: ', error));
  }, []);
  //Get current products in the table 
  const indexOfLastUser = currentPage * productsPerPage;
  const indexOfFirstUser = indexOfLastUser - productsPerPage;
  const currentProducts = products.slice(indexOfFirstUser, indexOfLastUser);
  //Change the page of table
  const paginate = pageNumber => setCurrentPage(pageNumber);

  function handlePageChange(page) {
    debugger
    onPageChange(page);
  }
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete products',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${BASE_URL}/Product/${id}`;
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        })
          .then(response => {
            if (response.ok) {
              window.location.reload(); // Reload the current page
            } else {
              console.error('Error deleting product:', response.status);
              if (response.status === 400) {
                return response.json();
              } else {
                throw new Error('Unexpected error occurred!');
              }
            }
          })
          .then(data => {
            if (data && data.errors) {
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
        <h1 className='title'>Products</h1>
        <button className='create-link' onClick={() => handlePageChange('ProductForm')}><BsPlusCircleDotted /></button>
      </div>
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Product Image</th>
              <th>Product</th>
              <th>Actions</th>
            </tr>
            {currentProducts.map(product => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td><img className='table-img' src={product.productImg} alt='img' /></td>
                <td>{product.productName}</td>
                <td className='action-buttons'>
                  <AiOutlineDelete onClick={() => handleDelete(product.productId)} className='delete-button' />
                  <AiOutlineEdit onClick={() => handleEdit(product)} className='edit-button' />
                </td>

              </tr>
            ))}
          </tbody>

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