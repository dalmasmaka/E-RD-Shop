import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import '../CSS/StoreManagement.css';
const Productvariant = ({onPageChange}) => {
    function handlePageChange(page) {
        onPageChange(page);
      }
    
    return(
        <div className="main-container">
        <div className="header-container">
            <h1 className='title'>Product Variants</h1>
            <button className='create-link' onClick={() => handlePageChange('ProductVariantForm')}>Create new Product Variant</button>
        </div>
        <div className="table-container">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Product Variant Image</th>
                    <th>Product Variant</th>
                    <th>Product </th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td><img className='table-img' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' alt='img'/></td>
                    <td>Maria Anders</td>
                    <td>Maria Anders</td>
                    <td className='action-buttons'>
                        <AiOutlineDelete className='delete-button' />
                        <AiOutlineEdit className='edit-button' />
                    </td>

                </tr>

            </table>
        </div>
    </div> 
    );
}
export default Productvariant