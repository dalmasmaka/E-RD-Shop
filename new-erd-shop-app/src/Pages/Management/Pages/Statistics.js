import React, { useState, useEffect } from "react";
import {
  get10MostExpensiveVariants,
  getCategoriesCount,
  getProductsCount,
  getProductsCountByCategory,
  getStoresCount,
  getVariantsCount,
} from "../../../API/Api";
import ApexCharts from 'apexcharts' // Import ApexCharts from 'react-apexcharts'

export default function Statistics() {
  const [userRole, setUserRole] = useState("");
  const [loggedUserId, setLoggedUserId] = useState("");
  const [storesCount, setStoresCount] = useState("");
  const [categoriesCount, setCategoriesCount] = useState("");
  const [productsCount, setProductsCount] = useState("");
  const [productVariantsCount, setProductVariantsCount] = useState("");
  const [topTenMostExpensiveVariants, setTopTenMostExpensiveVariants] = useState(
    []
  );
  const [topTenProductsByCategory, setTopTenProductsByCategory] = useState([]);

  function parseJwt(token) {
    try {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("access-token") !== undefined) {
      const userData = parseJwt(localStorage.getItem("access-token"));
      setUserRole(
        userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
      setLoggedUserId(
        userData["http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor"]
      );
    }
  }, []);

  useEffect(() => {
    if (userRole === "Admin") {
      const fetchData = async () => {
        try {
          const storesCountData = await getStoresCount();
          setStoresCount(storesCountData.result);
          const categoriesCountData = await getCategoriesCount();
          setCategoriesCount(categoriesCountData.result);
          const productsCountData = await getProductsCount();
          setProductsCount(productsCountData.result);
          const variantsCountData = await getVariantsCount();
          setProductVariantsCount(variantsCountData.result);
          const topTenMostExpensiveVariantsData = await get10MostExpensiveVariants();
          setTopTenMostExpensiveVariants(
            topTenMostExpensiveVariantsData.result
          );
          const topTenProductsByCategoryData = await getProductsCountByCategory();
          setTopTenProductsByCategory(topTenProductsByCategoryData.result);
        
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [userRole]);

  useEffect(() => {
    const topTenProductsByCategoryArray = Object.values(topTenProductsByCategory);
    if (topTenMostExpensiveVariants.length > 0 && topTenProductsByCategoryArray.length > 0) {
      const options1 = {
        series: [
          {
            name: "Top Ten Most Expensive Variants",
            data: topTenMostExpensiveVariants.map((item) => ({
              x: item.productVariantName,
              y: item.price,
            })),
          },
        ],
        chart: {
          height: 350,
          type: "rangeArea",
          animations: {
            speed: 500,
          },
        },
        colors: ["rgba(99,81,71,1) "],
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 0.24,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        title: {
          text: "Top Ten Most Expensive Variants",
        },
        markers: {
          hover: {
            sizeOffset: 5,
          },
        },
      };

      const options2 = {
        series: [
          {
            name: "Total Products", // This is the series name
            data: topTenProductsByCategoryArray.map((item) => item.count),
          },
        ],
        chart: {
          type: "bar",
          height: 200,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        colors: ['rgba(99,81,71,1)'],
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: topTenProductsByCategoryArray.map((item) => item.categoryName),
        },
        title: {
          text: 'Products', // This is the chart title
        },
      };
      

      const chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
      const chart2 = new ApexCharts(document.querySelector("#chart2"), options2);

      chart1.render();
      chart2.render();
    }
  }, [topTenMostExpensiveVariants, topTenProductsByCategory]);

  return (
    <div className="page-container">
      <div className="header-statistics">
        <div className="inner-element">
          <p>Stores</p>
          <p className="counter">{storesCount}</p>
        </div>
        <div className="inner-element">
          <p>Categories</p>
          <p className="counter">{categoriesCount}</p>
        </div>
        <div className="inner-element">
          <p>Products</p>
          <p className="counter">{productsCount}</p>
        </div>
        <div className="inner-element">
          <p>Product Variants</p>
          <p className="counter">{productVariantsCount}</p>
        </div>
      </div>
      <div className="body-statistics">
        <div id="chart1"></div>
        <div id="chart2"></div>
      </div>
    </div>
  );
}
