import '../CSS/StoreManagement.css';
import {BsPlusCircleDotted} from 'react-icons/bs';

const Store = ({onPageChange}) => {
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
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                    </tr>

                </table>
            </div>
        </div>
    );
}
export default Store;