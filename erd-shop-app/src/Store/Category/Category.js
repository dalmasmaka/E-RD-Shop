import React, { useEffect, useState } from "react";
import CategoryType from "../CategoryType/CategoryType";
import iphone from "../Assets/img/iphone.png";
import "./CategoryCss.css";
import { getCategory } from "../../API/api";
import { AiOutlineSearch } from "react-icons/ai";

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState();

  useEffect(() => {
    getCategory()
      .then((data) => setCategories(data.result))
      .catch((error) => console.error("Error: ", error));
  }, []);

  const filterData = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return categories.filter(
      (item) => regex.test(item.categoryName)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterData(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  return (
    <div className="category">
      <h1 className="category-title">Category</h1>
      <form className="form-search">
        <div className="search-container">
      <AiOutlineSearch />
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
        </div>
      </form>
      <div className="category-products">
        {searchText
          ? searchedResults.map((category) => {
              return (
                <CategoryType
                  id={category.categoryId}
                  name={category.categoryName}
                  image={category.categoryImg}
                />
              );
            })
          : categories.map((category) => {
              return (
                <CategoryType
                  id={category.categoryId}
                  name={category.categoryName}
                  image={category.categoryImg}
                />
              );
            })}
      </div>
    </div>
  );
};
