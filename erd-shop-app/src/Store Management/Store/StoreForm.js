import React, { useState } from 'react';
import { BASE_URL } from '../../API/api';
import Swal from 'sweetalert2';

const StoreForm = ({ onPageChange }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
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
        event.preventDefault(); // Prevent page reload
        const url = `${BASE_URL}/Store`; // Replace single quotes with backticks
        const requestData = {
            storeName: event.target.storeName.value,
            storeOwner: event.target.storeOwner.value,
            storeLocation: event.target.storeLocation.value,
            storeContact: event.target.storeContact.value,
            storeImg: selectedImage,
        };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                showSuccessMessage()
                //console.log('Response:', data);
            })
            .catch(error => {
                showErrorMessage()
                //console.error('Error:', error);
            });
    };
    const showSuccessMessage = () => {
        debugger
        Swal.fire({
            title: 'Successfully!',
            text: 'Store has been created!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('Store'); // Call handlePageChange with the desired page
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
                <h2 className="title">Create new Store</h2>
            </div>
            <div className="store-form-container">
                <form className="store-form" onSubmit={handleSubmit}>
                    <div className="first-row">
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeName">Store name: </label>
                            <input className='inputs' type="text" id="storeName" name="storeName" required
                                minLength="4" maxLength="10" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeOwner">Owner: </label>
                            <input className='inputs' type="text" id="storeOwner" name="storeOwner" required
                                minLength="4" maxLength="10" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeLocation">Location: </label>
                            <input className='inputs' type="text" id="storeLocation" name="storeLocation" required
                                minLength="4" maxLength="10" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeContact">Contact: </label>
                            <input className='inputs' type="text" id="storeContact" name="storeContact" required
                                minLength="4" maxLength="10" size="10" />
                        </div>
                    </div>
                    <div className="second-row">
                        <div className="image-container">
                            <div>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                            {previewImage && <img className='upload-img' id='storeImg' name='storeImg' src={previewImage} alt="Preview" />}
                        </div>
                    </div>
                    <div className='actions-form-container'>
                        <button className='cancel-form-button' onClick={() => handlePageChange('Store')}>Cancel</button>
                        <button className='create-form-button' type='submit'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreForm;