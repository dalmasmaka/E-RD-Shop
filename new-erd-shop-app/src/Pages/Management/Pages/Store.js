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
import { deleteStore, editStore, getStore, getStoreByStoreKeeper, getStorekeepers, getStores, postStore } from "../../../API/Api";
import { AiOutlineCloudUpload, AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Store() {
  const dataTableRef = useRef(null);
  const [stores, setStores] = useState([]);
  const [storeKeepers, setStoreKeepers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [imageURL, setImageURL] = useState(null); // Retrieves the uploaded image
  const [showPopUpForm, setShowPopUpForm] = useState(false);
  const [storeId, setStoreId] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeContact, setStoreContact] = useState('');
  const [storeOwner, setStoreOwner] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState();
  const [loggedUserId, setLoggedUserId] = useState('');
  const [params, setParams] = useState('');
  const [storeOfStoreKeeper, setStoreOfStoreKeeper] = useState('');
  function parseJwt(token) {
    try {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("access-token") != undefined) {
      const userData = parseJwt(localStorage.getItem("access-token"));
      //we get the role og the logged in user
      setUserRole(
        userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
      //we get the id of the logged in user
      setLoggedUserId(
        userData["http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor"]
      );
    }
  }, [params]);
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
  useEffect(() => {
    getStorekeepers()
      .then(data => {
        setStoreKeepers(data.result);
      })
      .catch(error => {
        console.error('Error:', error);
      })
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStoreByStoreKeeper(loggedUserId);
        const storeData = data.result;
        setStoreOfStoreKeeper(storeData);
        setStoreId(storeData.storeId);
        setStoreName(storeData.storeName);
        setStoreOwner(storeData.storeOwner);
        setStoreContact(storeData.storeContact);
        setImageURL(storeData.storeImg);
        localStorage.setItem('storeOfStoreKeeper', JSON.stringify(storeData));
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [loggedUserId]);
  

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
    setUserId('');

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
      setUserId(storeData.result.userId);
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
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const selectedStoreKeeper = storeKeepers.find(storeKeeper => storeKeeper.firstName === selectedValue);
    if (selectedStoreKeeper) {
      // Set firstName in storeOwner and userId in user
      setStoreOwner(selectedStoreKeeper.firstName);
      setUserId(selectedStoreKeeper.userId);
    } else {
      // Handle the case where no matching storeKeeper is found
      console.error(`StoreKeeper not found for firstName: ${selectedValue}`);
      // You can choose to display an error message or handle it in another way
      // For now, clear both values
      setStoreOwner('');
      setUserId('');
    }
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
          userId
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
          userId
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
      {userRole === "Admin" ? (
        <div className="admin-container">
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

                <div className="form-input form-name-input margin">
                  <label>Store Contact</label>
                  <input type="text" value={storeContact} onChange={(e) => setStoreContact(e.target.value)} required />
                </div>
                <div className="form-input form-name-input margin">
                  <p style={{ padding: "15px" }}>Store Owner</p>
                  <select
                    value={storeOwner}
                    onChange={handleSelectChange}
                    className="form-dropdown"
                  >
                    <option value="" disabled>Select Store Owner</option>
                    {storeKeepers.map(storeKeeper => (
                      <option key={storeKeeper.userId} value={storeKeeper.firstName}>
                        {storeKeeper.firstName} {storeKeeper.lastName}
                      </option>
                    ))}
                  </select>

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
      ) : userRole === "Store Keeper" ? (
        <div className="storekeeper-container">
          <ToastContainer/>
          <div className="page-header-container">
            <h1>Your Store Information</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="information-container">
              <div className="leftside-information">
                <div className="information-input">
                  <label>Store name</label>
                  <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} minLength={5} disabled />
                </div>
                <div className="information-input margin">
                  <label>Store Owner</label>
                  <input type="text" value={storeOwner} onChange={(e) => setStoreOwner(e.target.value)} minLength={1} disabled />
                </div>
                <div className="information-input margin">
                  <label>Store Contact</label>
                  <input type="text" value={storeContact} onChange={(e) => setStoreContact(e.target.value)} required />
                </div>
              </div>
              <div className="rightside-information">
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
              <button className="create-new-button" id="createButton" type="submit"><p>{storeId ? "Update store" : "Create Store"}</p></button>
            </div>
          </form>
        </div>
      ) : (<p></p>)}

    </div>
  );
}