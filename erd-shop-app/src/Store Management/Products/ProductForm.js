import React, { useState } from 'react';
import { useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { BASE_URL, getStores } from '../../API/api';
import Swal from 'sweetalert2';


const ProductForm = ({ onPageChange, selectedProduct }) => {
    const [stores, setStores] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [productImg, setProductImg] = useState('');

    useEffect(() => {
        if (selectedProduct) {
            setProductName(selectedProduct.productName);
            setProductImg(selectedProduct.productImg);
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
    const handleSubmit = (event) => {

        event.preventDefault();
        const url = `${BASE_URL}/Product`;
        const requestData = {
            productName: productName,
            productImg: productImg,
        };

        if (selectedProduct) {
            requestData.productId = selectedProduct.productId
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
                    console.log(data)
                    showCreateSuccessMessage();
                })
                .catch((error) => {
                    showErrorMessage();
                });
        }
    };

    const showCreateSuccessMessage = () => {
        debugger
        Swal.fire({
            title: 'Successfully!',
            text: 'Product has been created!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('Products'); // Call handlePageChange with the desired page
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
                handlePageChange('Products'); // Call handlePageChange with the desired page
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
    const loadOptions = (inputValue, callback) => {
        // Simulated asynchronous request to fetch store options
        setTimeout(() => {
            const filteredStores = stores.filter((store) =>
                store.storeName.toLowerCase().includes(inputValue.toLowerCase())
            );

            const options = filteredStores.map((store) => ({
                value: store.storeId,
                label: store.storeName
            }));

            callback(options);
        }, 1000);
    };
    return (
        <div className="main-container">
            <div className="header-container">
                <h2 className="title">Create new Product</h2>
            </div>
            <div className="product-form-container">
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="first-row">
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="productName">Product name: </label>
                            <input className='inputs' type="text" id="productName" name="productName" required minLength="4" maxLength="8" size="10"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)} />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Choose the store: </label>

                            <select className='select-store-for-product'>
                                {stores.map((store) => {
                                    return <option>{store.storeName}</option>;
                                })}
                            </select>                        </div>
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
                <button className='create-form-button' type='submit'>Create</button>
            </div>
        </form>
            </div >
        </div >
    );
};

export default ProductForm;
