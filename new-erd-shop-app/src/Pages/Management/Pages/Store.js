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
import { deleteStore, editStore, getStore, getStores, postStore } from "../../../API/Api";
import { AiOutlineCloudUpload, AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Store() {
  const dataTableRef = useRef(null);
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [imageURL, setImageURL] = useState(null); // Retrieves the uploaded image
  const [showPopUpForm, setShowPopUpForm] = useState(false);
  const [storeId, setStoreId] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeOwner, setStoreOwner] = useState('');
  const [storeContact, setStoreContact] = useState('');

  useEffect(() => {
    getStores()
      .then(data => {
        setStores(data.result);
        setIsLoading(false); // Once data is loaded, set isLoading to false
      })
      .catch(error => {
        console.error('Error: ', error);
        setIsLoading(false); // In case of an error, set isLoading to false
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
  }, [isLoading]); // Watch for changes in isLoading state
  // IMAGE HANDLER
  const handleFileChange = (event) => { // this function reads the file and sets the imageURL state with the data URL
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }

  }
  // FORM INPUTS HANDLER
  const resetForm = () => {
    setStoreId('');
    setStoreName('');
    setStoreOwner('');
    setStoreContact('');
    setImageURL(null);

  }
  // BUTTON HANDLERS
  const handleCreateButtonClick = () => {
    setShowPopUpForm(true);
  };
  const handleCancelButtonClick = () => {
    setShowPopUpForm(false);
    getStores()
      .then(data => {
        setStores(data.result);
        setIsLoading(false); // Once data is loaded, set isLoading to false
      })
      .catch(error => {
        console.error('Error: ', error);
        setIsLoading(false); // In case of an error, set isLoading to false
      });
    resetForm();
  }

  const handleEditButtonClick = async (id) => {
    try {
      const storeData = await getStore(id);
      setStoreId(storeData.result.storeId);
      setStoreName(storeData.result.storeName);
      setStoreOwner(storeData.result.storeOwner);
      setStoreContact(storeData.result.storeContact);
      setImageURL(storeData.result.storeImg);
      setShowPopUpForm(true);
    }

    catch (error) {
      console.error('Error fetching store data:', error);
    }
  };

  const deleteStoreById = async (id) => {
    try {
      await deleteStore(id);
      getStores()
        .then(data => {
          setStores(data.result);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error: ', error);
          setIsLoading(false);
        });
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  };
  const handleDeleteButtonClick = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this store?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteStoreById(id),
        },
        {
          label: 'No',
          onClick: () => { } // Do nothing if "No" is clicked
        }
      ]
    });
  };

  // MAIN FORM SUBMIT HANDLER
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (storeId) {
        const editedStoreData = {
          storeId,
          storeName,
          storeOwner,
          storeContact,
          storeImg: imageURL,
        };
        const response = await editStore(editedStoreData);
        console.log(response);
        toast.success('The store has been updated!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const response = await postStore({
          storeName,
          storeOwner,
          storeContact,
          storeImg: imageURL,
        });
        console.log(response)
        toast.success('The store has been created!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close the toast automatically after 3000 milliseconds (3 seconds)
          hideProgressBar: false, // Show the progress bar
          closeOnClick: true, // Close the toast when clicked
          pauseOnHover: true, // Pause the timer when hovered over the toast
          draggable: true, // Allow dragging the toast
          progress: undefined // Use the default progress bar style
        });
      }

    } catch (error) {
      toast.error('Error creating/updating the store', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className="page-container">
      {showPopUpForm && <div className="overlay" />}
      <div className="page-header-container">
        <h1>All Stores Information</h1>
        <button className="create-new-button" id="createButton" onClick={handleCreateButtonClick}><p>Create new store</p></button>
      </div>
      <div className="datatable-container">
        {isLoading ? (
          <p>Loading...</p> // Show loading message when data is loading
        ) : (
          <table id="datatable" cellSpacing="0" width="100%">
            <thead>
              <tr>
                <th>Store</th>
                <th>Store Owner</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map(store => (
                <tr key={store.storeId}>
                  <td>{store.storeName}</td>
                  <td>{store.storeOwner}</td>
                  <td>{store.storeContact}</td>
                  <td className="actions-td"><AiOutlineEdit onClick={() => handleEditButtonClick(store.storeId)} /> <BsTrash onClick={() => handleDeleteButtonClick(store.storeId)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="popup-form" style={{ display: showPopUpForm ? 'block' : 'none' }}>
        <ToastContainer />
        <div className="popup-header margin">
          <h1>{storeId ? "Update store" : "Create store"}</h1>
          <p>{storeId ? "by re-writing down store informations..." : "by writing down store informations..."}</p>

        </div>
        <div className="popup-body">
          <form onSubmit={handleSubmit}>
            <div className="form-input form-name-input margin">
              <label>Store name</label>
              <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} required minLength={5} />

            </div>
            <div className="flex-inputs">
              <div className="form-input other-form-inputs margin">
                <label>Store Owner</label>
                <input type="text" value={storeOwner} onChange={(e) => setStoreOwner(e.target.value)} required minLength={1} />
              </div>
              <div className="form-input other-form-inputs margin">
                <label>Store Contact</label>
                <input type="text" value={storeContact} onChange={(e) => setStoreContact(e.target.value)} required />
              </div>
            </div>
            <div className="flex-inputs">
              <div className="form-input form-name-input margin">
                <label htmlFor="fileInput">

                  {imageURL ? (
                    <div className="form-input form-name-input ">
                      <p>Store Logo</p>
                      <img src={imageURL} alt="Uploaded" style={{ maxWidth: '200px' }} />
                    </div>) :
                    (
                      <div>
                        <p>Store Logo</p> <AiOutlineCloudUpload className="file-upload-logo" />
                      </div>
                    )}

                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
            <div className="form-buttons margin">
              <button className="cancel-button" id="cancelButton" type="button" onClick={handleCancelButtonClick}><p>Cancel</p></button>
              <button className="create-new-button" id="createButton" type="submit"><p>{storeId ? "Update store" : "Create new store"}</p></button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}