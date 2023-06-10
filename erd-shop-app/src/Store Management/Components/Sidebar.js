import React, { useState } from 'react';
import '../CSS/StoreManagement.css';
import { MdOutlineStoreMallDirectory } from 'react-icons/md';
import { TbUsers } from 'react-icons/tb';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Sidebar = ({ onPageChange }) => {
  const [storeSectionActive, setStoreSectionActive] = useState(true);
  const [ordersSectionActive, setOrdersSectionActive] = useState(true);
  const [usersSectionActive, setUsersSectionActive] = useState(true);

  function toggleStoreSection() {
    setStoreSectionActive(!storeSectionActive);
  }

  function toggleOrdersSection() {
    setOrdersSectionActive(!ordersSectionActive);
  }

  function toggleUsersSection() {
    setUsersSectionActive(!usersSectionActive);
  }

  function handlePageChange(page) {
    onPageChange(page);
  }

  function handleSubElementClick(page, event) {
    event.stopPropagation();
    handlePageChange(page);
  }

  return (
    <div className="sidebar-content">
      <ul className="content">
        <li
          className={`elements ${storeSectionActive ? 'active' : ''}`}
          onClick={toggleStoreSection}
        >
          <MdOutlineStoreMallDirectory /> Store Inventory
          {storeSectionActive && (
            <ul className="sub-elements">
              <li
                className="elements"
                onClick={(event) => handleSubElementClick('Store', event)}
              >
                Store
              </li>
              <li
                className="elements"
                onClick={(event) => handleSubElementClick('Category', event)}
              >
                Category
              </li>
              <li
                className="elements"
                onClick={(event) => handleSubElementClick('Products', event)}
              >
                Product
              </li>
              <li
                className="elements"
                onClick={(event) =>
                  handleSubElementClick('ProductVariant', event)
                }
              >
                Product Variant
              </li>
            </ul>
          )}
        </li>
        <li
          className={`elements ${ordersSectionActive ? 'active' : ''}`}
          onClick={toggleOrdersSection}
        >
          <AiOutlineShoppingCart /> Orders Inventory
          {ordersSectionActive && (
            <ul className="sub-elements">
              <li
                className="elements"
                onClick={(event) => handleSubElementClick('Orders', event)}
              >
                Orders
              </li>
            </ul>
          )}
        </li>
        <li
          className={`elements ${usersSectionActive ? 'active' : ''}`}
          onClick={toggleUsersSection}
        >
          <TbUsers /> Users Inventory
          {usersSectionActive && (
            <ul className="sub-elements">
              <li
                className="elements"
                onClick={(event) => handleSubElementClick('Clients', event)}
              >
                Clients
              </li>
              {/* <li
                className="elements"
                onClick={(event) =>
                  handleSubElementClick('StoreKeepers', event)
                }
              >
                Store Keepers
              </li> */}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
