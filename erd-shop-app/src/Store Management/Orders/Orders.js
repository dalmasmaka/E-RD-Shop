import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../CSS/StoreManagement.css';
const Orders = ({ onPageChange }) => {
    function handlePageChange(page) {
        onPageChange(page);
    }
    return (
        <div className="main-container">
            <div className="header-container">
                <h2 className='title'>Orders</h2>

            </div>
            <div className="table-container">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Products</th>
                        <th>Order Date</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>
                            <p>produkti 1</p>
                            <p>produkti 2</p>
                        </td>
                        <td>Maria Anders</td>
                        <td>200$</td>
                        <td className='action-buttons'>
                            <AiOutlineInfoCircle onClick={() => handlePageChange('OrderDetails')} />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
export default Orders