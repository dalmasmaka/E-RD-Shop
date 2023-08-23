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
import { deleteProduct, editProduct, getProduct, getProducts, postProduct, getStores, getCategories } from "../../../API/Api";
import { AiOutlineCloudUpload, AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export default function Product() {
    const dataTableRef = useRef(null);
    const [stores, setStores] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const [imageURL, setImageURL] = useState(null); // Retrieves the uploaded image
    const [showPopUpForm, setShowPopUpForm] = useState(false);
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [isTransportable, setIsTransportable] = useState(false);
    const [storeId, setStoreId] = useState('');
    const [categoryId, setCategoryId] = useState('');

    //retrieving stores
    useEffect(() => {
        getStores()
            .then(data => {
                setStores(data.result);
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }, []);
    //retrieving the categories 
    useEffect(() => {
        getCategories()
            .then(data => {
                setCategories(data.result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    //retrieving the products
    useEffect(() => {
        getProducts()
            .then(data => {
                setProducts(data.result);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error', error);
            })
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
    //form inputs handler
    const resetForm = () => {
        setStoreId('');
        setCategoryId('');
        setProductId('');
        setProductName('');
        setImageURL(null);
        setIsTransportable(null);
    }
    //button handlers
    const handleCreateButtonClick = () => {
        setShowPopUpForm(true);
    };
    const handleCancelButtonClick = () => {
        setShowPopUpForm(false);
        getProducts()
            .then(data => {
                setProducts(data.result);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error', error);
                setIsLoading(false);
            });
        resetForm();
    }
    const handleEditButtonClick = async (id) => {
        try {
            const productData = await getProduct(id);
            setCategoryId(productData.result.categoryId);
            setStoreId(productData.result.storeId);
            setProductId(productData.result.productId);
            setProductName(productData.result.productName);
            setImageURL(productData.result.productImg);
            setIsTransportable(productData.result.isTransportable);
            setShowPopUpForm(true);
        } catch (error) {
            console.error('Error', error);
        }
    };
    // ...

    const deleteProductById = async (id) => {
        try {
            const response = await deleteProduct(id);
            if (response.isSuccess) {
                getProducts()
                    .then(data => {
                        setProducts(data.result);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error', error);
                    });
            } else {
                // Handle the error message by displaying an alert
                alert(response.errorMessage.join('\n'));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // ...

    const handleDeleteButtonClick = (id) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteProductById(id),
                },
                {
                    label: 'No',
                    onClick: () => { } // Do nothing if "No" is clicked
                }
            ]
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (productId) {
                const editedProductData = {
                    productId,
                    storeId,
                    categoryId,
                    productName,
                    isTransportable,
                    productImg: imageURL,
                };
                const response = await editProduct(editedProductData);
                toast.success('The product has been updated!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                const postProductData = {
                    storeId,
                    categoryId,
                    productName,
                    isTransportable,
                    productImg: imageURL,
                };
                const response = await postProduct(postProductData);
                toast.success('The product has been created!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            toast.error('Error creating/updating the product', {
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
                <h1>All Products Information</h1>
                <button className="create-new-button" id="createButton" onClick={handleCreateButtonClick}><p>Create new product</p></button>
            </div>
            <div className="datatable-container">
                {isLoading ? (
                    <p>Loading...</p> // Show loading message when data is loading
                ) : (
                    <table id="datatable" cellSpacing="0" width="100%">
                        <thead>
                            <tr>
                                {/* <th>Product Image</th> */}
                                <th>Product Name</th>
                                <th>Transportable</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                            
                                <tr key={product.productId}>
                                    {/* <td>{product.productImg}</td> */}
                                    <td>{product.productName}</td>
                                    <td>{product.isTransportable ? "Available Transport" : "Non-Available Transport"}</td>

                                    <td className="actions-td"><AiOutlineEdit onClick={() => handleEditButtonClick(product.productId)} /> <BsTrash onClick={() => handleDeleteButtonClick(product.productId)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="popup-form" style={{ display: showPopUpForm ? 'block' : 'none' }}>
                <ToastContainer />
                <div className="popup-header margin">
                    <h1>{productId ? "Update product" : "Create product"}</h1>
                    <p>{productId ? "by re-writing down product informations..." : "by writing down product informations..."}</p>

                </div>
                <div className="popup-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-input form-name-input margin">
                            <label>Product name</label>
                            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />

                        </div>
                        <div className="flex-inputs">
                            <div className="form-input other-form-inputs margin">
                                <select value={storeId} onChange={(e) => setStoreId(e.target.value)} className="form-dropdown">
                                    <option value="" disabled>Select Store</option> {/* Initial placeholder */}
                                    {stores.map((store) => (
                                        <option key={store.storeId} value={store.storeId}>
                                            {store.storeName}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className="form-input other-form-inputs margin">
                                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-dropdown">
                                    <option value="" disabled>Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex-inputs">
                            <div className="form-input form-name-input margin">
                                <p style={{padding: "15px"}}>Please make sure you tell us if your product is transportable for delivery reasons.</p>
                                <select value={isTransportable} onChange={(e) => setIsTransportable(e.target.value === 'true')} className="form-dropdown">
                                    <option  disabled>Select Transportability</option>
                                    <option value={true}>Available Transport</option>
                                    <option value={false}>Non-Available Transport</option>
                                </select>
                            </div>

                        </div>
                        <div className="flex-inputs">
                            <div className="form-input form-name-input margin">
                                <label htmlFor="fileInput">

                                    {imageURL ? (
                                        <div className="form-input form-name-input ">
                                            <p>Product Image</p>
                                            <img src={imageURL} alt="Uploaded" style={{ maxWidth: '200px' }} />
                                        </div>) :
                                        (
                                            <div>
                                                <p>Product Image</p> <AiOutlineCloudUpload className="file-upload-logo" />
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
                            <button className="create-new-button" id="createButton" type="submit"><p>{productId ? "Update product" : "Create new product"}</p></button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}