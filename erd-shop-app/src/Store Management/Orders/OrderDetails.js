const OrderDetails = () => {
    return (
        <div className="main-container">
            <div className="header-container">
                <h1 className="title">#ID Orders INFO </h1>
            </div>
            <div className="order-info-container">
                <div className="product-form">
                    <div className="first-row">
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Products: </label>
                            <input disabled className='inputs' type="text" id="name" name="name" required minLength="4" maxLength="8" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">SKU code: </label>
                            <input disabled className='inputs' type="number" id="name" name="name" required minLength="4" maxLength="8" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Price: </label>
                            <input disabled className='inputs' type="number" id="name" name="name" required minLength="4" maxLength="8" size="10" />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="name">Stock Quantity: </label>
                            <input disabled className='inputs' type="number" id="name" name="name" required minLength="4" maxLength="8" size="10" />
                        </div>
                    </div>
                    <div className="second-row">

                        {/* rest of the code */}
                    </div>
                    <div className='actions-form-container'>

                        <button className='create-form-button'>Exit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OrderDetails