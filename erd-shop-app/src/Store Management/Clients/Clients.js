import '../CSS/StoreManagement.css';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle } from 'react-icons/ai';
const Clients = () => {
    return (
        <div className="main-container">
            <div className="header-container">
                <h1 className='title'>Clients</h1>
            </div>
            <div className="table-container">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Dalma Smaka</td>
                        <td>Maria Anders</td>
                        <td>200$</td>
                        <td className='action-buttons'>
                            <AiOutlineInfoCircle className='' />
                            <AiOutlineDelete className='delete-button' />
                            <AiOutlineEdit className='edit-button' />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
export default Clients