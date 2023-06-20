import { useEffect, useState } from 'react';
import '../CSS/StoreManagement.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { BASE_URL, getCategory } from '../../API/api';
import Swal from 'sweetalert2';


const Categories = ({ onPageChange, onEdit }) => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage, setCategoriesPerPage] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleEdit = (category) => {
        setSelectedCategory(category);
        onEdit("dashboard/categoryform", null, category);
    };
    useEffect(() => {
        getCategory()
            .then(data => setCategories(data.result))
            .catch(error => console.error('Error: ', error));
    }, []);
    //Get current categories
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    // const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    function handlePageChange() {
        onPageChange("dashboard/categoryform");
    }

    const handleDelete = (id) => {
        Swal.fire({
          title: 'Delete Category',
          text: 'Are you sure you want to delete this category?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            const url = `${BASE_URL}/Category/${id}`;
      
            fetch(url, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({})
            })
              .then(response => {
                if (response.ok) {
                  window.location.reload();
                 
                } else {
                  // Handle error case
                  console.error('Error deleting category:', response.status);
                  if (response.status === 400) {
                    return response.json(); 
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
                <h1 className='title'>Category</h1>
                <button className='create-link' onClick={() => handlePageChange('CategoryForm')}><BsPlusCircleDotted /></button>
            </div>
            <div className="table-container">
                <table>
                  <tbody>
                  <tr>
             
                        <th>Category Image</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                    {categories.map(categories => (
                        <tr key={categories.categoryId}>

                          
                            <td><img className='table-img' src={categories.categoryImg} alt='img' /></td>
                            <td>{categories.categoryName}</td>
                            <td className='action-buttons'>
                                <AiOutlineDelete className='delete-button' onClick={() => handleDelete(categories.categoryId)}/>
                                <AiOutlineEdit className='edit-button' onClick={() => handleEdit(categories)}/>
                            </td>

                        </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <div className="pagination">
                <Pagination
                    categoriesPerPage={categoriesPerPage}
                    totalCategories={categories.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </div>

    );
};
const Pagination = ({ categoriesPerPage, totalCategories, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCategories / categoriesPerPage); i++) {
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
export default Categories