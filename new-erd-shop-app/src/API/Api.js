import { post } from "jquery";

export const BASE_URL = "https://localhost:5000/api";
// export const BASE_URL = "https://localhost:5002/api";

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

export async function getCategory() {
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
export function getProducts() {
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
export function getStoreById(id) {
  return fetch(`${BASE_URL}/Store/${id}`)
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
export async function getVariantsByProduct(productId) {
  const response = await fetch(`${BASE_URL}/Product/${productId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
export async function getVariantDetails(variantId) {
  const response = await fetch(`${BASE_URL}/ProductVariant/${variantId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
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
