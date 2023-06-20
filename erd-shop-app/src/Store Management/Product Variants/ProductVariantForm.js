import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { BASE_URL } from '../../API/api';
import Swal from 'sweetalert2';
const ProductVariantForm = ({ onPageChange, selectedProductVariant, selectedProduct }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [productVariantName, setProductVariantName] = useState('')
    const [skuCode, setSkuCode] = useState('')
    const [price, setPrice] = useState('')
    const [stockQuantity, setStockQuantity] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [productVariantImg, setProductVariantImg] = useState('')
    const [productId, setProductId] = useState('')
    const [productName, setProductName] = useState('')
    const [supplyPrice, setSupplyPrice] = useState('')
    const [barcode, setBarcode] = useState('')
    const [totalSupplyPrice, setTotalSupplyPrice] = useState('')
    useEffect(() => {
        if (selectedProduct) {
            setProductId(selectedProduct.productId)
            setProductName(selectedProduct.productName)
        }
    }, [selectedProduct]);

    useEffect(() => {
        if (selectedProductVariant) {
            setProductVariantName(selectedProductVariant.productVariantName);
            setSkuCode(selectedProductVariant.skuCode);
            setStockQuantity(selectedProductVariant.stockQuantity);
            setShortDescription(selectedProductVariant.shortDescription);
            setPrice(selectedProductVariant.price);
            setProductVariantImg(selectedImage);
            setSupplyPrice(selectedProductVariant.supplyPrice);
            setBarcode(selectedProductVariant.barcode);
            setTotalSupplyPrice(selectedProductVariant.totalSupplyPrice);
            setProductId(selectedProductVariant.productId);
        }
    }, [selectedProductVariant]);

    const handlePageChange = (page) => {
        onPageChange('dashboard/products');
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setProductVariantImg(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    useEffect(() => {
        if (stockQuantity !== '' && supplyPrice !== '') {
            const calculatedTotalSupplyPrice = stockQuantity * supplyPrice;
            setTotalSupplyPrice(calculatedTotalSupplyPrice);
        } else {
            setTotalSupplyPrice(''); 
        }
    }, [stockQuantity, supplyPrice]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${BASE_URL}/ProductVariant`;

        const requestData = {
            productVariantName: productVariantName,
            skuCode: skuCode,
            stockQuantity: stockQuantity,
            shortDescription: shortDescription,
            productVariantImg: productVariantImg,
            price: price,
            barcode: barcode,
            supplyPrice: supplyPrice,
            totalSupplyPrice: totalSupplyPrice,
            productId: productId,
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
        Swal.fire({
            title: 'Successfully!',
            text: 'Product Variant has been created!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    };
    const showUpdateSuccessMessage = () => {
        Swal.fire({
            title: 'Successfully!',
            text: 'Product Variant has been updated!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        }).then((result) => {

            if (result.isConfirmed) {
                window.location.reload();
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
                <h2 className="title">Product Variant Details</h2>
            </div>
            <div className="product-form-container">
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="first-row">
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Product ID of Product Variant: </label>
                            <input className='inputs' type="text" id="productName" name="productName" required value={productId} onChange={(e) => setProductName(e.target.value)} disabled />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="productVariantName">Product Variant name: </label>
                            <input className='inputs' type="text" id="productVariantName" name="productVariantName" required value={productVariantName} onChange={(e) => setProductVariantName(e.target.value)} />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="shortDescription">Product Description: </label>
                            <textarea className='text-area-input' id="shortDescription" name="shortDescription" rows="5" cols="30" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} ></textarea>
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="price">Price: </label>
                            <input className='inputs' type="number" id="price" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <div className='first-row-element'>
                            <label className='labels' htmlFor="barcode">Barcode: </label>
                            <input className='inputs' type="text" id="barcode" name="barcode" required value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                        </div>
                    </div>
                    <div className="second-row">
                        <div className='second-row-element'>
                            <label className='labels' htmlFor="skuCode">SKU code: </label>
                            <input className='inputs' type="text" id="skuCode" name="skuCode" required value={skuCode} onChange={(e) => setSkuCode(e.target.value)} />
                        </div>
                        <div className='second-row-element'>
                            <label className='labels' htmlFor="stockQuantity">Stock Quantity: </label>
                            <input className='inputs' type="number" id="stockQuantity" name="stockQuantity" required value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />
                        </div>
                        <div className='second-row-element'>
                            <label className='labels' htmlFor="supplyPrice">Supply Price : </label>
                            <input className='inputs' type="number" id="supplyPrice" name="supplyPrice" required value={supplyPrice} onChange={(e) => setSupplyPrice(e.target.value)} />
                        </div>
                        <div className='second-row-element'>
                            <label className='labels' htmlFor="totalSupplyPrice">Total Supply Price : </label>
                            <input className='inputs' type="number" id="totalSupplyPrice" name="totalSupplyPrice" required value={totalSupplyPrice} onChange={(e) => setTotalSupplyPrice(e.target.value)} disabled />
                        </div>
                        <div className="image-container">
                            <div>
                                <input type="file" onChange={handleImageChange} />
                            </div>
                            {previewImage && <img className='upload-img' src={previewImage} alt="Preview" id='productVariantImg' name='productVariantImg' />}
                        </div>

                    </div>
                    <div className='actions-form-container'>
                        <button className='cancel-form-button' onClick={() => handlePageChange()}>Cancel</button>
                        <button className='create-form-button' type='submit'>Save Details</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ProductVariantForm