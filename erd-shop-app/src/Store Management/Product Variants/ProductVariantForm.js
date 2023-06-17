import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { BASE_URL } from '../../API/api';
import Swal from 'sweetalert2';
const ProductVariantForm = ({onPageChange, selectedProductVariant}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [productVariantName, setProductVariantName] = useState('')
    const [skuCode, setSkuCode] = useState('')
    const [price, setPrice] = useState('')
    const [stockQuantity, setStockQuantity] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [productVariantImg, setProductVariantImg] = useState('')

    useEffect(() => {
        if(selectedProductVariant)
        {
            setProductVariantName(selectedProductVariant.productVariantName);
            setSkuCode(selectedProductVariant.skuCode);
            setStockQuantity(selectedProductVariant.setStockQuantity);
            setShortDescription(selectedProductVariant.shortDescription);
            setPrice(selectedProductVariant.setPrice);
            setProductVariantImg(selectedImage);
        }
    }, [selectedProductVariant]);

    const handlePageChange = (page) =>{
        onPageChange(page);
    }

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
        const url = `${BASE_URL}/ProductVariant`;
        const requestData = {
            productVariantName: productVariantName,
            skuCode: skuCode,
            stockQuantity: stockQuantity,
            shortDescription: shortDescription,
            productVariantImg: productVariantImg,
            price: price
        };

        if (selectedProductVariant) {
            requestData.productVariantId = selectedProductVariant.productVariantId
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
    };

    const showCreateSuccessMessage = () => {
        debugger
        Swal.fire({
            title: 'Successfully!',
            text: 'Product Variant has been created!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('ProductVariant'); // Call handlePageChange with the desired page
            }
        });
    };
    const showUpdateSuccessMessage = () => {
        debugger
        Swal.fire({
            title: 'Successfully!',
            text: 'Product Variant has been updated!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                handlePageChange('ProductVariant'); // Call handlePageChange with the desired page
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



    return (
        <div className="main-container">
            <div className="header-container">
                <h2 className="title">Create new Product Variant</h2>
            </div>
            <div className="product-form-container">
                <form className="product-form" onSubmit={handleSubmit}> 
                    <div className="first-row">
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="productVariantName">Product Variant name: </label>
                            <input className='inputs' type="text" id="productVariantName" name="productVariantName" required value={productVariantName}  onChange={(e) => setProductVariantName(e.target.value)} />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="skuCode">SKU code: </label>
                            <input className='inputs' type="text" id="skuCode" name="skuCode" required value={skuCode}  onChange={(e) => setSkuCode(e.target.value)}  />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="price">Price: </label>
                            <input className='inputs' type="number" id="price" name="price" required value={price}  onChange={(e) => setPrice(e.target.value)}  />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="stockQuantity">Stock Quantity: </label>
                            <input className='inputs' type="number" id="stockQuantity" name="stockQuantity" required value={stockQuantity}  onChange={(e) => setStockQuantity(e.target.value)}  />
                        </div>



                    </div>
                    <div className="second-row">
                        <div className='second-row-element'>
                            <label className='labels' htmlFor="name">Choose the product: </label>
                            <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions />
                        </div>
                        <div className='second-row-element'>
                            <label className='labels' htmlFor="shortDescription">Product Description: </label>
                            <textarea className='text-area-input' id="shortDescription" name="shortDescription" rows="5" cols="30" value={shortDescription}  onChange={(e) => setShortDescription(e.target.value)} ></textarea>
                        </div>

                        <div className="image-container">
                            <div>
                                <input type="file" onChange={handleImageChange} />
                            </div>
                            {previewImage && <img className='upload-img' src={previewImage} alt="Preview" id='productVariantImg' name='productVariantImg'  />}
                        </div>

                    </div>
                    <div className='actions-form-container'>
                        <button className='cancel-form-button' onClick={() => handlePageChange('ProductVariant')}>Cancel</button>
                        <button className='create-form-button' type='submit'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ProductVariantForm