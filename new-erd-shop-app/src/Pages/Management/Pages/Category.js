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
import { deleteCategory, editCategory, getCategory, getCategories, postCategory } from "../../../API/Api";
import { AiOutlineCloudUpload, AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export default function Category() {
    const dataTableRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const [imageURL, setImageURL] = useState(null); // Retrieves the uploaded image
    const [showPopUpForm, setShowPopUpForm] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [params, setParams] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
      if (localStorage.getItem("access-token") != undefined) {
        const userData = parseJwt(localStorage.getItem("access-token"));

        //we get the role og the logged in user
        setUserRole(
          userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        );
      }
    }, [params]);
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

    //Retrieving all the categories
    useEffect(() => {
        getCategories()
            .then(data => {
                setCategories(data.result);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error: ', error);
                setIsLoading(false);
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
    const handleFileChange = (event) => { 
        const selectedImage = event.target.files[0];
        if (selectedImage) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageURL(reader.result);
          };
          reader.readAsDataURL(selectedImage);
        }
    
      }
    const resetForm = () => {
        setCategoryId('');
        setCategoryName('');
        setImageURL('');
    }
    //Button handlers
    const handleCreateButtonClick = () => {
        setShowPopUpForm(true);
    };
    const handleCancelButtonClick = () => {
        setShowPopUpForm(false);
        getCategories()
            .then(data => {
                setCategories(data.result);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error: ', error);
                setIsLoading(false);
            });
        resetForm();
    }
    const handleEditButtonClick = async (id) => {
        try {
            const categoryData = await getCategory(id);
            setCategoryId(categoryData.result.categoryId);
            setCategoryName(categoryData.result.categoryName);
            setImageURL(categoryData.result.categoryImg);
            setShowPopUpForm(true);
        }
        catch (error) {
            console.error('Error fetching category data: ', error);
        }
    };
    const deleteCategoryById = async (id) => {
        try {
            await deleteCategory(id);
            getCategories()
                .then(data => {
                    setCategories(data.result);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error: ', error);
                    setIsLoading(false);
                });
        }
        catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    const handleDeleteButtonClick = (id) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteCategoryById(id),
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };
    //Main form submit handler 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (categoryId) {
                const editedCategoryData = {
                    categoryId,
                    categoryName,
                    categoryImg: imageURL,
                };
                const response = await editCategory(editedCategoryData);
             
                toast.success('The category has been updated!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                const postCategoryData = {
                    categoryName,
                    categoryImg: imageURL,
                }
                const response = await postCategory(postCategoryData);
               
                toast.success('The category has been created!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false, 
                    closeOnClick: true, 
                    pauseOnHover: true,
                    draggable: true, 
                    progress: undefined 
                });
            }
        } catch (error) {
            toast.error('Error creating/updating the category', {
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
          <h1>All Categories Information</h1>
          <button className="create-new-button" id="createButton" onClick={handleCreateButtonClick}><p>Create new category</p></button>
        </div>
        <div className="datatable-container">
          {isLoading ? (
            <p>Loading...</p> // Show loading message when data is loading
          ) : (
            <table id="datatable" cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.categoryId}>
                    <td>{category.categoryName}</td>
                    {userRole == "Admin" ? 
                    (
                      <td className="actions-td"><AiOutlineEdit onClick={() => handleEditButtonClick(category.categoryId)} /> <BsTrash onClick={() => handleDeleteButtonClick(category.categoryId)} /></td>
                    ) :(
                     <td>You don't have permission to make changes as a store keeper</td>
                    )}
                    
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="popup-form" style={{ display: showPopUpForm ? 'block' : 'none' }}>
          <ToastContainer />
          <div className="popup-header margin">
            <h1>{categoryId ? "Update category" : "Create category"}</h1>
            <p>{categoryId ? "by re-writing down category informations..." : "by writing down category informations..."}</p>
  
          </div>
          <div className="popup-body">
            <form onSubmit={handleSubmit}>
              <div className="form-input form-name-input margin">
                <label>Category name</label>
                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required minLength={5} />
  
              </div>
              <div className="flex-inputs">
                <div className="form-input form-name-input margin">
                  <label htmlFor="fileInput">
  
                    {imageURL ? (
                      <div className="form-input form-name-input ">
                        <p>Category Image</p>
                        <img src={imageURL} alt="Uploaded" style={{ maxWidth: '200px' }} />
                      </div>) :
                      (
                        <div>
                          <p>Category Logo</p> <AiOutlineCloudUpload className="file-upload-logo" />
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
                <button className="create-new-button" id="createButton" type="submit"><p>{categoryId ? "Update category" : "Create new category"}</p></button>
              </div>
            </form>
  
          </div>
        </div>
      </div>
    );
}