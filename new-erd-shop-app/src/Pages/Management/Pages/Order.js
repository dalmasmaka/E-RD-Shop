import React, { useEffect, useRef, useState } from "react";
import "../Components/Components.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from "jquery";
import "datatables.net"; // Import only the main DataTables library
import "datatables.net-buttons"; // Import the Buttons extension
import "datatables.net-buttons/js/buttons.html5"; // Import the HTML5 export button
import "datatables.net-buttons/js/buttons.print"; // Import the Print button
import "datatables.net-dt/css/jquery.dataTables.css"; // Import the DataTables core CSS
import "datatables.net-buttons-dt/css/buttons.dataTables.css"; // Import the Buttons extension CSS
import { getOrders } from "../../../API/Api";
import 'react-confirm-alert/src/react-confirm-alert.css';
export default function Order() {
    const dataTableRef = useRef(null);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getOrders()
            .then(data => {
                setOrders(data.result);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }, []);
    // DATATABLE 
    useEffect(() => {
        if (!dataTableRef.current && !isLoading) {
            // DataTable initialization when the component mounts and data is available
            dataTableRef.current = $('#datatable').DataTable({
                dom: '<"dt-buttons"Bf><"clear">lirtp',
                paging: true,
                autoWidth: true,
                buttons: [
                    'colvis',
                    'copyHtml5',
                    'csvHtml5',
                    'excelHtml5',
                    'pdfHtml5',
                    'print'
                ],
            });
        }
    }, [isLoading]);
    return (
        <div className="page-container">
            <div className="page-header-container">
                <h1>All Orders Information</h1>
            </div>
            <div className="datatable-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <table id="datatable" cellSpacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Ordered Products</th>
                                <th>Total Price</th>
                                <th>Shipping Address</th>
                                <th>Costumer</th>
                                <th>Payment Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.orderId}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    );
}