import React, { useState } from 'react';
import { BASE_URL } from '../../API/api';
import { error } from 'jquery';


const StoreForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

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
        debugger;
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
            console.log('Response:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }
    
    

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
                                minlength="4" maxlength="8" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeOwner">Owner: </label>
                            <input className='inputs' type="text" id="storeOwner" name="storeOwner" required
                                minlength="4" maxlength="8" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeLocation">Location: </label>
                            <input className='inputs' type="text" id="storeLocation" name="storeLocation" required
                                minlength="4" maxlength="8" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="storeContact">Contact: </label>
                            <input className='inputs' type="text" id="storeContact" name="storeContact" required
                                minlength="4" maxlength="8" size="10" />
                        </div>
                    </div>
                    {/* Rest of the code */}
                    <div className="second-row">
                        <div className="image-container">
                            <div>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                            {previewImage && <img className='upload-img' id='storeImg' name='storeImg' src={previewImage} alt="Preview" />}
                        </div>
                    </div>
                    <div className='actions-form-container'>
                        <button className='cancel-form-button'>Cancel</button>
                        <button className='create-form-button' type='submit'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreForm;