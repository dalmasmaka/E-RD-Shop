import { useEffect, useState } from 'react';
import '../CSS/StoreManagement.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { getCategory } from '../../API/api';

const Category = ({ onPageChange }) => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage, setCategoriesPerPage] = useState(10);

    useEffect(() => {
        getCategory()
            .then(data => setCategories(data.result))
            .catch(error => console.error('Error: ', error));
    }, []);
    //Get current categories
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    function handlePageChange(page) {
        onPageChange(page);
    }

    return (
        <div className="main-container">
            <div className="header-container">
                <h1 className='title'>Category</h1>
                <button className='create-link' onClick={() => handlePageChange('CategoryForm')}><BsPlusCircleDotted /></button>
            </div>
            <div className="table-container">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Category Image</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                    {categories.map(categories => (
                        <tr key={categories.categoryId}>
                            <td>{categories.categoryId}</td>
                            <td><img className='table-img' src={categories.categoryImg} alt='img' /></td>
                            <td>{categories.categoryName}</td>
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
export default Category