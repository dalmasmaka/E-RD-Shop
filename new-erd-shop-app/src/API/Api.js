import { error } from "jquery";
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
export const BASE_URL = "https://localhost:5000/api";

export function getUsers() {
  return fetch(`${BASE_URL}/Authentication/GetUsers`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function getUser() {
  return fetch(`${BASE_URL}/User`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export function getStorekeepers() {
  return fetch(`${BASE_URL}/User/Storekeepers`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function getProductsByCategory(categoryId) {
  const response = await fetch(`${BASE_URL}/Category/${categoryId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export function getVariantsInWishlist() {
  return fetch(`${BASE_URL}/WishlistManagement`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export function getVariantsInShoppingCart() {
  return fetch(`${BASE_URL}/ShoppingCartManagement`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export async function getCountries() {
  return fetch(`${BASE_URL}/Country`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export async function getCities() {
  return fetch(`${BASE_URL}/City`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function getStores() {
  return fetch(`${BASE_URL}/Store`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export function getStoresCount() {
  return fetch(`${BASE_URL}/Store/StoresCount`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export async function postStore(storeData) {
  try {
    const response = await fetch(`${BASE_URL}/Store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}
export async function editStore(storeData) {
  try {
    const response = await fetch(`${BASE_URL}/Store`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export async function getStore(id) {
  try {
    const response = await fetch(`${BASE_URL}/Store/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function getStoreByStoreKeeper(userId) {
  try {
    const response = await fetch(`${BASE_URL}/Store/StoreKeeper/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Netowrk response was not okay");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function getProductsByStore(storeId) {
  try {
    const response = await fetch(
      `${BASE_URL}/Product/StoreProducts/${storeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }

    const data = await response.json();

    if (!data.isSuccess) {
      throw new Error(data.Result);
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteStore(id) {
  try {
    const response = await fetch(`${BASE_URL}/Store/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function getVariantsInUserWishlist(userId) {
  return await fetch(`${BASE_URL}/WishlistManagement/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export async function getVariantsInUserShoppingCart(userId) {
  return await fetch(`${BASE_URL}/ShoppingCartManagement/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export async function getCategories() {
  return fetch(`${BASE_URL}/Category`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export async function getCategoriesCount() {
  return fetch(`${BASE_URL}/Category/CategoriesCount`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
export async function postCategory(categoryData) {
  try {
    const response = await fetch(`${BASE_URL}/Category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function editCategory(categoryData) {
  try {
    const response = await fetch(`${BASE_URL}/Category`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getCategory(id) {
  try {
    const response = await fetch(`${BASE_URL}/Category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const response = await fetch(`${BASE_URL}/Category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

export async function getProducts() {
  return fetch(`${BASE_URL}/Product`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export async function getProductsCount() {
  return fetch(`${BASE_URL}/Product/ProductsCount`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export async function getProductsCountByCategory() {
  return fetch(`${BASE_URL}/Product/Top10ProductsByCategory`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export async function postProduct(productData) {
  try {
    const response = await fetch(`${BASE_URL}/Product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function editProduct(productData) {
  try {
    const response = await fetch(`${BASE_URL}/Product`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function getProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/Product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/Product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}
export function getProductVariants() {
  return fetch(`${BASE_URL}/ProductVariant`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
export function getVariantsCount() {
  return fetch(`${BASE_URL}/ProductVariant/ProductVariantCount`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
export function get10MostExpensiveVariants() {
  return fetch(`${BASE_URL}/ProductVariant/GetTopTenMostExpensiveVariants`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

export async function postProductVariant(productVariantData) {
  try {
    const response = await fetch(`${BASE_URL}/ProductVariant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productVariantData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function editProductVariant(productVariantData) {
  try {
    const response = await fetch(`${BASE_URL}/ProductVariant`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productVariantData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function getProductVariant(id) {
  try {
    const response = await fetch(`${BASE_URL}/ProductVariant/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function deleteProductVariant(id) {
  try {
    const response = await fetch(`${BASE_URL}/ProductVariant/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);

    throw error;
  }
}
export function getOrders() {
  return fetch(`${BASE_URL}/orders`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
export async function postOrder(orderData) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function editOrder(orderData) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function getOrder(id) {
  try {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function deleteOrder(id) {
  try {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function confirmEmail(userId, token) {
  try {
    const response = await fetch(`${BASE_URL}/Authentication/confirm-email?userId=${userId}&token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
// Make an API call to your backend


function EmailConfirmation() {
  const { userId, token } = useParams();

  useEffect(() => {
    // Make the API call using userId and token
    fetch(`${BASE_URL}/Authentication/confirm-email?userId=${userId}&token=${token}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        // Handle the response data (e.g., show a success message)
        console.log(data);
      })
      .catch(error => {
        // Handle errors (e.g., show an error message)
        console.error('Fetch error:', error);
      });
  }, [userId, token]); // Make sure to include userId and token in the dependency array

  return (
    <div>
      {/* Render your confirmation component here */}
    </div>
  );
}

export default EmailConfirmation;



// fetch(`${BASE_URL}/Authentication/confirm-email`, {
//   params: {
//     userId: userId,
//     token: token
//   }
// })
// .then(response => {
//   // Handle the response (e.g., show a success message)
// })
// .catch(error => {
//   // Handle errors (e.g., show an error message)
// });

