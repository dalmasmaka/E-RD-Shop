import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import '../CSS/StoreManagement.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { BASE_URL, getProductVariants } from '../../API/api';
import { error } from 'jquery';
import Swal from 'sweetalert2';
const Productvariant = ({ onPageChange, onEdit }) => {
  const [productVariants, setProductVariants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productVariantsPerPage, setProductVariantsPerPage] = useState(10);
  const [selectedProductVariant, setSelectedProductVariant] = useState(null);
  const handleEdit = (productVariant) => {
    setSelectedProductVariant(productVariant);
    onEdit("ProductVariantForm", null, null, null, productVariant);
  };
  useEffect(() => {
    getProductVariants()
      .then(data => setProductVariants(data.result))
      .catch(error => console.error('Error: ', error));
  }, []);
  //Get current product variants 
  const indexOfLastProductVariant = currentPage * productVariantsPerPage;
  const indexOfFirstProductVariant = indexOfLastProductVariant - productVariantsPerPage;
  const currentProductVariants = productVariants.slice(indexOfFirstProductVariant, indexOfLastProductVariant);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  function handlePageChange(page) {
    onPageChange(page);
  }
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete ProductVariant',
      text: 'Are you sure you want to delete this product variant?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${BASE_URL}/ProductVariant/${id}`;

        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}) // Add an empty request body
        })
          .then(response => {
            if (response.ok) {

              window.location.reload(); // Reload the current page

            } else {
              // Handle error case
              console.error('Error deleting product variant:', response.status);
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
        <h1 className='title'>Product Variants</h1>
      </div>
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Product Variant Image</th>
              <th>Product Variant</th>
              <th>Description </th>
              <th>Actions</th>
            </tr>
            {productVariants.map(productVariant => (
              <tr key={productVariant.productVariantId}>
                <td>{productVariant.productVariantId}</td>
                <td><img className='table-img' src={productVariant.productVariantImg} alt='img' /></td>
                <td>{productVariant.productVariantName}</td>
                <td>{productVariant.shortDescription}</td>
                <td className='action-buttons'>
                  <AiOutlineDelete className='delete-button' onClick={() => handleDelete(productVariant.productVariantId)} />
                  <AiOutlineEdit className='edit-button' onClick={() => handleEdit(productVariant)} />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <div className="pagination">
        <Pagination
          productVariantsPerPage={productVariantsPerPage}
          totalProductVariants={productVariants.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>

    </div>
  );
};
const Pagination = ({ productVariantsPerPage, totalProductVariants, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProductVariants / productVariantsPerPage); i++) {
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
export default Productvariant