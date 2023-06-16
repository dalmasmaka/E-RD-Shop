import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { getStores } from '../../API/api';
//import { colourOptions } from '../data';

const ProductForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [stores, setStores] = useState([]);
    useEffect(() => {
        const fetchStores = async() => {
            const data = await getStores();
            setStores(data.result);
        }
        fetchStores();
    }, [])
    
    const colourOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
    const filterColors = (inputValue) => {
        return colourOptions.filter((i) =>
          i.label && i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      };
      
      
    const loadOptions = (
        inputValue,
        callback
    ) => {
        setTimeout(() => {
            callback(filterColors(inputValue));
        }, 1000);
    };

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
                            <input className='inputs' type="text" id="name" name="name" required minLength="4" maxLength="8" size="10" />
                        </div>
                        <div className='first-row-element'>
                        <label className='labels' htmlFor="name">Choose the store: </label>
                        <select>
                                {stores.map((store) => {
                                    return <option>{store.storeName}</option>;
                                })}
                            </select>
                        </div>
                    </div>
                    {/* Rest of the code */}
                    <div className="second-row">
                        <div className="image-container">
                            <div>
                                <input type="file" onChange={handleImageChange} />
                            </div>
                            {previewImage && <img className='upload-img' src={previewImage} alt="Preview" />}
                        </div>
                    </div>
                    <div className='actions-form-container'>
                        <button className='cancel-form-button'>Cancel</button>
                        <button className='create-form-button'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
