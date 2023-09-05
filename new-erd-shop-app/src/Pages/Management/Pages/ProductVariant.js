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
import { getProducts, deleteProductVariant, editProductVariant, getProductVariant, getProductVariants, postProductVariant, getStores, getCategories, getProductsByStore, getStoreByStoreKeeper } from "../../../API/Api";
import { AiOutlineCloudUpload, AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export default function ProductVariant() {
    const dataTableRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [productVariants, setProductVariants] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const [imageURL, setImageURL] = useState(null); // Retrieves the uploaded image
    const [showPopUpForm, setShowPopUpForm] = useState(false);
    const [productId, setProductId] = useState('');
    const [productVariantId, setProductVariantId] = useState('');
    const [productVariantName, setProductVariantName] = useState('');
    const [barcode, setBarcode] = useState('');
    const [skuCode, setSkuCode] = useState('');
    const [supplyPrice, setSupplyPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState(0);
    const [totalSupplyPrice, setTotalSupplyPrice] = useState(0);
    const [price, setPrice] = useState('');
    const [shortDescription, setShortDescription] = useState(0);
    const [params, setParams] = useState('');
    const [userRole, setUserRole] = useState('');
    const [storeOfStoreKeeper, setStoreOfStoreKeeper] = useState('');
    const [storeProducts, setStoreProducts] = useState([]);
    const [loggedUserId, setLoggedUserId] = useState('');
    const [storeId, setStoreId] = useState('');
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
        if (userRole === "Admin") {
            // Retrieve product variants for Admin
            getProductVariants()
                .then(data => {
                    setProductVariants(data.result);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error', error);
                });
        } else if (userRole === "Store Keeper") {
            // Retrieve store data for Store Keeper
            const fetchData = async () => {
                try {
                    const data = await getStoreByStoreKeeper(loggedUserId);
                    const storeData = data.result;
                    setStoreOfStoreKeeper(storeData);
                    setStoreId(storeData.storeId);
    
                    // Retrieve products for Store Keeper
                    const productData = await getProductsByStore(storeData.storeId);
                    setStoreProducts(productData);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            fetchData();
        }
    }, [userRole, loggedUserId]);
    
    // Variants for Store Keeper should be calculated within the component, not at the top level
    const getVariantsForStore = () => {
        // Create a set of product IDs from storeProducts for efficient filtering
        const storeProductIds = new Set(storeProducts.map(product => product.productId));
    
        // Filter the product variants to get those that match the store product IDs
        const variantsForStore = productVariants.filter(variant => storeProductIds.has(variant.productId));
    
        return variantsForStore;
    };
    
    // Call this function to get the variants for the current store
    const variantsForCurrentStore = getVariantsForStore();
    
        //retrieving the products
        useEffect(() => {
            getProducts()
                .then(data => {
                    setProducts(data.result);
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
    //from inputs handler 
    const resetForm = () => {
        setProductVariantId('');
        setProductId('');
        setProductVariantName('');
        setPrice('');
        setBarcode('');
        setStockQuantity('');
        setShortDescription('');
        setImageURL(null);
        setTotalSupplyPrice('');
        setSupplyPrice('');
        setSkuCode('');
    }
    //button handlers
    const handleCreateButtonClick = () => {
        setShowPopUpForm(true);
    };
    const handleCancelButtonClick = () => {
        setShowPopUpForm(false);
        getProductVariants()
            .then(data => {
                setProductVariants(data.result);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error', error);
                setIsLoading(false);
            });
        resetForm();
    }
    useEffect(() => {
        if (stockQuantity !== '' && supplyPrice !== '') {
            const calculatedTotalSupplyPrice = stockQuantity * supplyPrice;
            setTotalSupplyPrice(calculatedTotalSupplyPrice);
        } else {
            setTotalSupplyPrice('');
        }
    }, [stockQuantity, supplyPrice]);
    const handleEditButtonClick = async (id) => {
        try {
            const variantsData = await getProductVariant(id);
            setProductVariantId(variantsData.result.productVariantId);
            setProductId(variantsData.result.productId);
            setProductVariantName(variantsData.result.productVariantName);
            setPrice(variantsData.result.price);
            setBarcode(variantsData.result.barcode);
            setStockQuantity(variantsData.result.stockQuantity);
            setShortDescription(variantsData.result.shortDescription);
            setImageURL(variantsData.result.productVariantImg);
            setTotalSupplyPrice(variantsData.result.totalSupplyPrice);
            setSkuCode(variantsData.result.skuCode);
            setSupplyPrice(variantsData.result.supplyPrice)
            setShowPopUpForm(true);
        } catch (error) {
            console.error('Error', error);
        }
    }
    const deleteVariantById = async (id) => {
        try {
            const response = await deleteProductVariant(id);
            if (response.isSuccess) {
                getProductVariants()
                    .then(data => {
                        setProductVariants(data.result);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error', error);
                    });
            } else {
                alert(response.errorMessage.join('\n'));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleDeleteButtonClick = (id) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this product variant?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteVariantById(id)
                },
                {
                    label: 'No',
                    onClick: () => { }//do nothing
                }
            ]
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (productVariantId) {
                const editedVariantData = {
                    productVariantId,
                    productId,
                    productVariantName,
                    price,
                    barcode,
                    stockQuantity,
                    shortDescription,
                    productVariantImg: imageURL,
                    supplyPrice,
                    totalSupplyPrice,
                };
                const response = await editProductVariant(editedVariantData);
                toast.success('This product variant has been updated!', {
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
                const postVariantData = {
                    productId,
                    productVariantName,
                    price,
                    barcode,
                    skuCode,
                    stockQuantity,
                    supplyPrice,
                    totalSupplyPrice,
                    shortDescription,
                    productVariantImg: imageURL
                };
                const response = await postProductVariant(postVariantData);
                toast.success('This product variant has been created!', {
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
            toast.error('Error creating/updating the product variant', {
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
                <h1>All Product Variants Information</h1>
                <button className="create-new-button" id="createButton" onClick={handleCreateButtonClick}><p>Create new product variant</p></button>
            </div>
            <div className="datatable-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <table id="datatable" cellSpacing={0} width="100%">
                        <thead>
                            <tr>
                                <th>Product Variant Name</th>
                                <th>Stock Quantity</th>
                                <th>Price</th>

                                <th>Short Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {userRole === "Admin" ? (<tbody>
                            {productVariants.map(variant => (

                                <tr key={variant.productVariantId}>
                                    <td>{variant.productVariantName}</td>
                                    <td>{variant.stockQuantity}</td>
                                    <td>{variant.price}</td>

                                    <td>{variant.shortDescription}</td>
                                    <td className="actions-td">
                                        <AiOutlineEdit onClick={() => handleEditButtonClick(variant.productVariantId)} />
                                        <BsTrash onClick={() => handleDeleteButtonClick(variant.productVariantId)} />
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>) :
                            userRole === "Store Keeper" ? (
                                <tbody>
                                    {variantsForCurrentStore.map(variant => (

                                        <tr key={variant.productVariantId}>
                                            <td>{variant.productVariantName}</td>
                                            <td>{variant.stockQuantity}</td>
                                            <td>{variant.price}</td>

                                            <td>{variant.shortDescription}</td>
                                            <td className="actions-td">
                                                <AiOutlineEdit onClick={() => handleEditButtonClick(variant.productVariantId)} />
                                                <BsTrash onClick={() => handleDeleteButtonClick(variant.productVariantId)} />
                                            </td>
                                        </tr>
                                    )
                                    )}
                                </tbody>
                            ) : (<p>Unauthorized</p>)}

                    </table>
                )}
            </div>
            <div className="popup-form" style={{ display: showPopUpForm ? 'block' : 'none' }}>
                <ToastContainer />
                <div className="popup-header margin">
                    {
                        productVariantId ? (
                            <>
                                <h1>Update product variant</h1>
                                <p>by re-writing down product variant informations...</p>
                            </>
                        ) : (
                            <>
                                <h1>Create product variant</h1>
                                <p>by writing down product informations...</p>
                            </>
                        )
                    }
                </div>
                <div className="popup-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-input form-name-input margin">
                            <label>Product Variant name</label>
                            <input type="text" value={productVariantName} onChange={(e) => setProductVariantName(e.target.value)} />
                        </div>
                        <div className="flex-inputs">
                            <div className="form-input other-form-inputs margin">
                                <label>Stock Quantity</label>
                                <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />
                            </div>
                            <div className="form-input other-form-inputs margin">
                                <label>Supply Price</label>
                                <input type="number" value={supplyPrice} onChange={(e) => setSupplyPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex-inputs">
                            <div className="form-input other-form-inputs margin">
                                <label>Total Supply Price</label>
                                <input type="number" value={totalSupplyPrice} onChange={(e) => setTotalSupplyPrice(e.target.value)} disabled />

                            </div>
                            <div className="form-input other-form-inputs margin">
                                <label>Price</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex-inputs">
                            <div className="form-input other-form-inputs margin">
                                <label>SKU Code</label>
                                <input type="text" value={skuCode} onChange={(e) => setSkuCode(e.target.value)} />

                            </div>
                            <div className="form-input other-form-inputs margin">
                                <label>Barcode</label>
                                <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex-inputs">
                            <div className="form-input form-name-input margin">
                                <label>Short Description</label>
                                <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex-inputs">
                            {userRole === "Admin" ? (
                                <div className="form-input form-name-input margin">
                                    <p style={{ padding: "15px" }}>Please select the main Product for this Variant</p>
                                    <select value={productId} onChange={(e) => setProductId(e.target.value)} className="form-dropdown">
                                        <option value="" disabled>Select Product</option>
                                        {products.map(product => (
                                            <option key={product.productId} value={product.productId}>
                                                {product.productName}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            ) : userRole === "Store Keeper" ? (
                                <div className="form-input form-name-input margin">
                                    <p style={{ padding: "15px" }}>Please select the main Product for this Variant</p>
                                    <select value={productId} onChange={(e) => setProductId(e.target.value)} className="form-dropdown">
                                        <option value="" disabled>Select Product</option>
                                        {storeProducts.map(product => (
                                            <option key={product.productId} value={product.productId}>
                                                {product.productName}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            )
                                : (null)}
                        </div>
                        <div className="flex-inputs">
                            <div className="form-input form-name-input margin">
                                <label htmlFor="fileInput">

                                    {imageURL ? (
                                        <div className="form-input form-name-input ">
                                            <p>Variant Image</p>
                                            <img src={imageURL} alt="Uploaded" style={{ maxWidth: '200px' }} />
                                        </div>) :
                                        (
                                            <div>
                                                <p>Variant Image</p> <AiOutlineCloudUpload className="file-upload-logo" />
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
                            <button className="create-new-button" id="createButton" type="submit"><p>{productVariantId ? "Update product variant" : "Create new product variant"}</p></button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}