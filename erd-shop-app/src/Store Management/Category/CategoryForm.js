import React, { useState } from 'react';
import { useEffect } from 'react';
import { BASE_URL } from '../../API/api';
import Swal from 'sweetalert2';
const CategoryForm = ({onPageChange, selectedCategory }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImg, setCategoryImg] = useState('');

    useEffect(() => {
        if(selectedCategory){
            setCategoryName(selectedCategory.categoryName);
            setCategoryImg(selectedCategory.categoryImg);
            setPreviewImage(selectedCategory.categoryImg); 
        }
    }, [selectedCategory]);

    const handlePageChange = () => {
        onPageChange("dashboard/categories");
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setCategoryImg(reader.result)
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${BASE_URL}/Category`;
        const requestData = {
            categoryName: categoryName,
            categoryImg: categoryImg,
        };

        if (selectedCategory) {
            requestData.categoryId = selectedCategory.categoryId
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then(() => {
                    showUpdateSuccessMessage();
                })
                .catch(() => {
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
                .then(() => {
                    showCreateSuccessMessage();
                })
                .catch(() => {
                    showErrorMessage();
                });
        }
    };

    const showCreateSuccessMessage = () => {
        Swal.fire({
            title: 'Successfully!',
            text: 'Category has been created!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('Category');
            }
        });
    };
    const showUpdateSuccessMessage = () => {
        Swal.fire({
            title: 'Successfully!',
            text: 'Category has been updated!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('Category'); 
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

    return(
        <div className="main-container">
        <div className="header-container">
            <h2 className="title">Category Details</h2>
        </div>
        <div className="category-form-container">
            <form className="category-form" onSubmit={handleSubmit}>
                <div className="first-row">
                    <div className='first-row-element'>
                        <label className='labels' htmlFor="categoryName">Category name: </label>
                        <input className='inputs' type="text" id="categoryName" name="categoryName" required
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                </div>
                <div className="second-row">
                    <div className="image-container">
                        <div>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                        {previewImage && <img className='upload-img' id='categoryImg' name='categoryImg' src={previewImage} alt="Preview" />}
                    </div>
                </div>
                <div className='actions-form-container'>
                    <button className='cancel-form-button' onClick={() => handlePageChange() }>Cancel</button>
                    <button className='create-form-button' type='submit'>Save Details</button>
                </div>
            </form>
        </div>
    </div>
    );
}
export default CategoryForm;