import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
const ProductVariant = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);


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
                <h2 className="title">Create new Product Variant</h2>
            </div>
            <div className="product-form-container">
                <form className="product-form">
                    <div className="first-row">
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Product Variant name: </label>
                            <input className='inputs' type="text" id="name" name="name" required minLength="4" maxLength="8" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">SKU code: </label>
                            <input className='inputs' type="number" id="name" name="name" required minLength="4" maxLength="8" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Price: </label>
                            <input className='inputs' type="number" id="name" name="name" required minLength="4" maxLength="8" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Stock Quantity: </label>
                            <input className='inputs' type="number" id="name" name="name" required minLength="4" maxLength="8" size="10" />
                        </div>



                    </div>
                    <div className="second-row">
                        <div className='second-row-element'>
                            <label className='labels' htmlFor="name">Choose the product: </label>
                            <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions />
                        </div>
                        <div className='second-row-element'>
                            <label className='labels' htmlFor="name">Product Description: </label>
                            <textarea className='text-area-input' id="name" name="name" required minLength="4" maxLength="8" rows="5" cols="30"></textarea>
                        </div>

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
}
export default ProductVariant