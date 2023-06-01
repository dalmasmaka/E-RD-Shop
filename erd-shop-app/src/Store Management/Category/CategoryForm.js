import React, { useState } from 'react';
const CategoryForm = () => {
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

    return(
        <div className="main-container">
        <div className="header-container">
            <h2 className="title">Create new Category</h2>
        </div>
        <div className="category-form-container">
            <form className="category-form">
                <div className="first-row">
                    <div className='first-row-element'>
                        <label className='labels' for="name">Category name: </label>
                        <input className='inputs' type="text" id="name" name="name" required
                            minlength="4" maxlength="8" size="10" />
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
                    <button className='cancel-form-button'>Cancel</button>
                    <button className='create-form-button'>Create</button>
                </div>
            </form>
        </div>
    </div>
    );
}
export default CategoryForm;