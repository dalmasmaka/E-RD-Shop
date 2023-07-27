//export const BASE_URL = "https://localhost:5000/api";
export const BASE_URL = "https://localhost:5002/api";

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