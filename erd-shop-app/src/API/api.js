export const BASE_URL = 'https://localhost:5000/api';

export function getUsers(){
    return fetch(`${BASE_URL}/Authentication/GetUsers`)
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        return response.json();
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


export function getCategory(){
    return fetch(`${BASE_URL}/Category`)
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        return response.json();
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
export function getProducts(){
    return fetch(`${BASE_URL}/Product`)
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        return response.json();
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
export function getProductVariants(){
    return fetch(`${BASE_URL}/ProductVariant`)
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        return response.json();
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
export function getStores(){
    return fetch(`${BASE_URL}/Store`)
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        return response.json();
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
