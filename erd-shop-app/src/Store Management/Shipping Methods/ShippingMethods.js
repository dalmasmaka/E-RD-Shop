import '../CSS/StoreManagement.css';
const ShippingMethods = () => {
    return(
        <div className="main-container">
        <div className="header-container">
            <h2 className='title'>Shipping Methods</h2>

        </div>
        <div className="table-container">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Shipping Method</th>
                    <th>More Info</th>
                    <th>Shipping Price</th>
                 

                </tr>
                <tr>
                    <td>1</td>
                    <td>Express</td>
                    <td>Maria Anders</td>
                    <td>200$</td>
                    


                </tr>

            </table>
        </div>
    </div>
    );
}
export default ShippingMethods