import { useEffect } from "react";
import { useState } from "react";

const UserForm = ({onPageChange, selectedUser}) => {
    const [first_Name, setFirstName] = useState(null);
    const [last_Name, setLastName] = useState(null);
    const [userName, setUsername] = useState(null);
    const [address, setAddress] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        if(selectedUser)
        {
            setFirstName(selectedUser.first_Name);
            setLastName(selectedUser.last_Name);
            setUsername(selectedUser.userName);
            setAddress(selectedUser.address);
            setEmail(selectedUser.email);
        }
    }, [selectedUser]);

    const handlePageChange = (page) => {
        onPageChange(page);
    }

    return (
        <div className="main-container">
            <div className="header-container">
                <h2 className="title">User Details</h2>
            </div>
            <div className="user-form-container">
                <form className="user-form" >
                    <div className="first-row">
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="first_Name">Name: </label>
                            <input className='inputs' type="text" id="first_Name" name="first_Name" required minLength="4" maxLength="8" size="10"
                                value={first_Name} disabled
                                />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="address">Address: </label>
                            <input className='inputs' type="text" id="address" name="address" required minLength="4" maxLength="8" size="10"
                                value={address} disabled
                                 />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="userName">Account Username: </label>
                            <input className='inputs' type="text" id="userName" name="userName" required minLength="4" maxLength="8" size="10"
                                value={userName} disabled
                               />
                        </div>
                    </div>
                    <div className="second-row">
                    <div className='first-row-element'>
                            <label className='labels' htmlFor="last_Name">Last Name: </label>
                            <input className='inputs' type="text" id="last_Name" name="last_Name" required minLength="4" maxLength="8" size="10"
                                value={last_Name} disabled
                               />
                        </div>
                        <div className='first-row-element'>
                            <label className='labels' htmlFor="email">Email: </label>
                            <input className='inputs' type="text" id="email" name="email" required minLength="4" maxLength="8" size="10"
                                value={email} disabled
                              />
                        </div>
                    </div>
                    <div className='actions-form-container'>
                        <button className='cancel-form-button' onClick={() => handlePageChange('Users')}>Exit</button>
                    </div>
                </form>
            </div >
        </div >
    );

}
export default UserForm