import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { BASE_URL, getCategory, getStores } from '../../API/api';
import Swal from 'sweetalert2';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const ProductForm = ({ onPageChange, selectedProduct }) => {
    const [stores, setStores] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [productImg, setProductImg] = useState('');
    const [isTransportable, setIsTransportable] = useState(true);
    const [storeId, setStoreId] = useState('');
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        if (selectedProduct) {
            setProductName(selectedProduct.productName);
            setProductImg(selectedProduct.productImg);
            setIsTransportable(selectedProduct.isTransportable);
            setStoreId(selectedProduct.storeId);
            setCategoryId(selectedProduct.categoryId);
        }
    }, [selectedProduct]);

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    useEffect(() => {
        getStores()
            .then(data => setStores(data.result))
            .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        getCategory()
            .then(data => setCategories(data.result))
            .catch(error => console.error('Error: ', error));
    }, []);

    const handleCheckboxChange = (event) => {
        event.preventDefault();
        setIsTransportable(event.target.checked);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);


        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setProductImg(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${BASE_URL}/Product`;
        const requestData = {
            productName: productName,
            productImg: productImg,
            isTransportable: isTransportable, // Include isTransportable value
            storeId: parseInt(storeId), // Convert to integer
            categoryId: parseInt(categoryId)
        };

        if (selectedProduct) {
            requestData.productId = selectedProduct.productId;
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    showUpdateSuccessMessage();
                })
                .catch((error) => {
                    showErrorMessage();
                });
        }
        else {
            // Create new store
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    showCreateSuccessMessage();
                })
                .catch((error) => {
                    showErrorMessage();
                });
        }
    };

    const showCreateSuccessMessage = () => {
        Swal.fire({
            title: 'Successfully!',
            text: 'Product has been created!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('Products');
            }
        });
    };
    const showUpdateSuccessMessage = () => {
        Swal.fire({
            title: 'Successfully!',
            text: 'Product has been updated!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                handlePageChange('Products');
            }
        });
    };
    const showErrorMessage = () => {
        Swal.fire(
            'error',
            'Oops...',
            'Something went wrong!'
        );
    };
    
    return (
        <div className="main-container">
            <div className="header-container">
                <h2 className="title">Product Details</h2>
            </div>
            <div className="product-form-container">
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="first-row">
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="productName">Product name: </label>
                            <input className='inputs' type="text" id="productName" name="productName" required size="10"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)} />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Choose the store: </label>
                            <select
                                className='select-dropdownList'
                                value={storeId}
                                onChange={(e) => setStoreId(e.target.value)}
                            >
                                {stores.map((store) => {
                                    return <option key={store.storeId} value={store.storeId}>{store.storeName}</option>;
                                })}
                            </select>
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Choose the category: </label>
                            <select
                                className='select-dropdownList'
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                {categories.map((category) => {
                                    return <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>;
                                })}
                            </select>
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="productName">Product Transportability: </label>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isTransportable}
                                        onChange={handleCheckboxChange}
                                        inputProps={{ 'aria-label': 'Transportable Checkbox' }}
                                    />
                                }
                                label="Is Transportable"
                                labelPlacement="start"
                            />
                        </div>
                    </div>
                    {/* Rest of the code */}
                    <div className="second-row">
                        <div className="image-container">
                            <div>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                            {previewImage && <img className='upload-img' id='productImg' name='productImg' src={previewImage} alt="Preview" />}
                        </div>
                    </div>
                    <div className='actions-form-container'>
                        <button className='cancel-form-button' onClick={() => handlePageChange('Products')}>Cancel</button>
                        <button className='create-form-button' type='submit'>Save Details</button>
                    </div>
                </form>
            </div >
        </div >
    );

};

export default ProductForm;
