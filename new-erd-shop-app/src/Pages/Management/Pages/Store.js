import React, { useEffect, useRef } from "react";
import "../Components/Components.css";
import $ from "jquery";
import "datatables.net"; // Import only the main DataTables library
import "datatables.net-buttons"; // Import the Buttons extension
import "datatables.net-buttons/js/buttons.html5"; // Import the HTML5 export button
import "datatables.net-buttons/js/buttons.print"; // Import the Print button
import "datatables.net-dt/css/jquery.dataTables.css"; // Import the DataTables core CSS
import "datatables.net-buttons-dt/css/buttons.dataTables.css"; // Import the Buttons extension CSS

export default function Store() {
  const dataTableRef = useRef(null);

  useEffect(() => {
    if (!dataTableRef.current) {
      // DataTable initialization when the component mounts
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
  }, []);

  return (
    <div className="store-container">
      <div className="store-header-container">
        <h1>All Stores Information</h1>
        <button className="create-new-button"><p>Create new store</p></button>
      </div>
      <div className="datatable-container">
        <table id="datatable" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>
                Dalma
              </th>
              <th>
                smaka
              </th>
              <th>
                Dalma
              </th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            <tr>
              <td>
                Dalma
              </td>
              <td>
                smaka
              </td>
              <td>
                smaka
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
