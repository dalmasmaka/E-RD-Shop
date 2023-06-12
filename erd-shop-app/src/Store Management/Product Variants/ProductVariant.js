import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import '../CSS/StoreManagement.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { getProductVariants } from '../../API/api';
import { error } from 'jquery';

const Productvariant = ({ onPageChange }) => {
    const [productVariants, setProductVariants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productVariantsPerPage, setProductVariantsPerPage] = useState(10);

    useEffect(() => {
        getProductVariants()
            .then(data => setProductVariants(data.result))
            .catch(error => console.error('Error: ', error));
    }, []);
    console.log(productVariants)
    //Get current product variants 
    const indexOfLastProductVariant = currentPage * productVariantsPerPage;
    const indexOfFirstProductVariant = indexOfLastProductVariant - productVariantsPerPage;
    const currentProductVariants = productVariants.slice(indexOfFirstProductVariant, indexOfLastProductVariant);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    function handlePageChange(page) {
        onPageChange(page);
    }

    return (
        <div className="main-container">
            <div className="header-container">
                <h1 className='title'>Product Variants</h1>
                <button className='create-link' onClick={() => handlePageChange('ProductVariantForm')}><BsPlusCircleDotted /></button>
            </div>
            <div className="table-container">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Product Variant Image</th>
                        <th>Product Variant</th>
                        <th>Description </th>
                        <th>Actions</th>
                    </tr>
                    {productVariants.map(productVariant => (
                        <tr key={productVariant.productVariantId}>
                        <td>1</td>
                        <td><img className='table-img' src={productVariant.productVariantImg} alt='img' /></td>
                        <td>{productVariant.productVariantName}</td>
                        <td>{productVariant.shortDescription}</td>
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