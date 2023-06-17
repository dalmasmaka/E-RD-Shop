import React, { useState, useEffect } from 'react';
import { BASE_URL, getCategory, getStores } from '../../API/api';
import AsyncSelect from 'react-select/async';
import Swal from 'sweetalert2';
//import { colourOptions } from '../data';

const ProductForm = ([onPageChange, selectedProduct]) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState([]);
    const [store, setStore] = useState(0);
    const [stores, setStores] = useState([]);
    const [productId, setProductId] = useState(0);
    const [productName, setProductName] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };
    const handlePageChange = (page) => {
        onPageChange(page);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${BASE_URL}/Store`;
        const requestData = {
            productId: productId,
            productName: productName,
            storeId: store,
            categoryId: category
        };

        if (selectedProduct) {
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
        } else {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    showCreateSuccessMessage();
                })
                .catch((error) => {
                    showErrorMessage();
                });
        }
    }
    const showCreateSuccessMessage = () => {
        // debugger
        Swal.fire({
            title: 'Successfully!',
            text: 'Product has been created!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('Category'); // Call handlePageChange with the desired page
            }
        });
    };
    const showUpdateSuccessMessage = () => {
        // debugger
        Swal.fire({
            title: 'Successfully!',
            text: 'Product has been updated!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('Category'); // Call handlePageChange with the desired page
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
    useEffect(() => {
        if(selectedProduct){
            setStore(selectedProduct.storeId);
            setProductId(selectedProduct.productId);
            setProductName(selectedProduct.productName);
            setCategory(selectedProduct.categoryId);
            setCategory(selectedProduct.productImg)
        }
        getCategory()
            .then(data => setCategories(data.result))
            .catch(error => console.error('Error: ', error));
        getStores()
            .then(data => setStores(data.result))
            .catch(error => console.error('Error: ', error));
    }, [])

    return (
        <div className="main-container">
            <div className="header-container">
                <h2 className="title">Create new Product</h2>
            </div>
            <div className="product-form-container">
                <form className="product-form">
                    <div className="first-row">
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Product name: </label>
                            <input className='inputs' type="text" id="name" name="name" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
                        </div>
                        <div className='first-row-element'>
                        <label className='labels' htmlFor="name">Choose the store: </label>
                            <select className="select" value={category} onChange={(e) => {setCategory(e.target.value)}}>
                                <option value='0'>Category</option>
                                {categories.map(category => (
                                    <option value={category.categoryId} key={category.categoryId}>{category.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <div className='first-row-element'>
                        <label className='labels' htmlFor="name">Choose a category: </label>
                            <select className="select" value={store} onChange={(e) => {setStore(e.target.value);console.log(e.target.value)}}>
                                <option value='0'>Store</option>
                                {stores.map(store => (
                                    <option value={store.storeId}>{store.storeName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="second-row">
                        <div className="image-container">
                            <div>
                                <input type="file" onChange={handleImageChange} />
                            </div>
                            {previewImage && <img className='upload-img' src={previewImage} alt="Preview" />}
                        </div>
                    </div>
                    <div className='actions-form-container'>
                        <button className='cancel-form-button' onClick={() => {handlePageChange('Products')}}>Cancel</button>
                        <button className='create-form-button' type="submit">Create</button>
                    </div>
                </form>
            </div>
            <button onClick={() => console.log(stores)}>Test</button>
        </div>
    );
};

export default ProductForm;
