import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../API/api';
import Swal from 'sweetalert2';

const StoreForm = ({ onPageChange, selectedStore }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [storeName, setStoreName] = useState('');
    const [storeOwner, setStoreOwner] = useState('');
    const [storeLocation, setStoreLocation] = useState('');
    const [storeContact, setStoreContact] = useState('');

    useEffect(() => {
        if (selectedStore) {
            setStoreName(selectedStore.storeName);
            setStoreOwner(selectedStore.storeOwner);
            setStoreLocation(selectedStore.storeLocation);
            setStoreContact(selectedStore.storeContact);
        }
    }, [selectedStore]);
    const handlePageChange = (page) => {
        onPageChange(page);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${BASE_URL}/Store`;
        const requestData = {
            storeName: storeName,
            storeOwner: storeOwner,
            storeLocation: storeLocation,
            storeContact: storeContact,
            storeImg: selectedImage,
        };

        if (selectedStore) {
            requestData.storeId = selectedStore.storeId
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
            text: 'Store has been created!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('dashboard/stores'); // Call handlePageChange with the desired page
            }
        });
    };
    const showUpdateSuccessMessage = () => {
        Swal.fire({
            title: 'Successfully!',
            text: 'Store has been updated!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('dashboard/stores'); // Call handlePageChange with the desired page
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
                <h2 className="title">Store Details</h2>
            </div>
            <div className="store-form-container">
                <form className="store-form" onSubmit={handleSubmit}>
                    <div className="first-row">
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeName">Store name: </label>
                            <input className='inputs' type="text" id="storeName" name="storeName" required
                                size="10"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)} />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeOwner">Owner: </label>
                            <input className='inputs' type="text" id="storeOwner" name="storeOwner" required
                                
                                value={storeOwner}
                                onChange={(e) => setStoreOwner(e.target.value)} />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeLocation">Location: </label>
                            <input className='inputs' type="text" id="storeLocation" name="storeLocation" required
                                value={storeLocation}
                                onChange={(e) => setStoreLocation(e.target.value)} />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeContact">Contact: </label>
                            <input className='inputs' type="text" id="storeContact" name="storeContact" required
                                value={storeContact}
                                onChange={(e) => setStoreContact(e.target.value)} />
                        </div>
                    </div>
                    <div className="second-row">
                        <div className="image-container">
                            <div>
                                <input type="file" accept="image/*" onChange={handleImageChange}/>
                            </div>
                            {previewImage && <img className='upload-img' id='storeImg' name='storeImg' src={previewImage} alt="Preview" />}
                        </div>
                    </div>
                    <div className='actions-form-container'>
                        <button className='cancel-form-button' onClick={() => handlePageChange('dashboard/stores')}>Cancel</button>
                        <button className='create-form-button' type='submit'>Save Details</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreForm;