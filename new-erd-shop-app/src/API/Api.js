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
export async function postStore(storeData) {
  try {
    const response = await fetch(`${BASE_URL}/Store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storeData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}
export async function editStore(storeData) {
  try {
    const response = await fetch(`${BASE_URL}/Store`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storeData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export async function getStore(id) {
  try {
    const response = await fetch(`${BASE_URL}/Store/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error:', error);
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
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
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
export async function postCategory(categoryData) {
  try {
    const response = await fetch(`${BASE_URL}/Category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export async function editCategory(categoryData) {
  try {
    const response = await fetch(`${BASE_URL}/Category`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getCategory(id) {
  try {
    const response = await fetch(`${BASE_URL}/Category/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not okay');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const response = await fetch(`${BASE_URL}/Category/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error: ', error);
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
export async function postProduct(productData) {
  try {
    const response = await fetch(`${BASE_URL}/Product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export async function editProduct(productData) {
  try {
    const response = await fetch(`${BASE_URL}/Product`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export async function getProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/Product/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not okay');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/Product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error: ', error);
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
export async function postProductVariant(productVariantData) {
  try {
    const response = await fetch(`${BASE_URL}/ProductVariant`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productVariantData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
  catch (error) {
    console.error('Error:', error);
    throw error;

  }
}
export async function editProductVariant(productVariantData) {
  try {

    const response = await fetch(`${BASE_URL}/ProductVariant`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productVariantData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
  catch (error) {
    console.error('Error:', error);
    throw error;

  }
}
export async function getProductVariant(id) {
  try {
    const response = await fetch(`${BASE_URL}/ProductVariant/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {

      throw new Error('Network response was not okay');
    }
    return response.json();
  }
  catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export async function deleteProductVariant(id) {
  try {
    const response = await fetch(`${BASE_URL}/ProductVariant/${id}`, {
      method: 'DELETE',

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
  catch (error) {
    console.error('Error: ', error);

    throw error;
  }
}
