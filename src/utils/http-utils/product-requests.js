import axios from 'axios';

const apiUrl = 'http://localhost:3005/products';
const loggedUserKey = 'loggedUser';

export const Category = {
    FOOD: 'Food',
    STATIONERY: 'Stationery',
    BUILD: 'Build'
};

export const Category2 = {
    ALL: 'All',
    FOOD: 'Food',
    STATIONERY: 'Stationery',
    BUILD: 'Build'
};

// .then => resolved correctly
// .catch => has error
// .finally => executed always
export function getAllProducts() {
    return axios.get(apiUrl);
}

//export function getAllVehiclesByBrand(brand) {
//    return axios.get(`${apiUrl}?brand=${brand}`);
//}

export function getProductsWithFilters(categoryFilter) {
    return axios.get(`${apiUrl}?category=${categoryFilter}`);
}

export function getProductsByCode(idFilter) {
    return axios.get(`${apiUrl}?id=${idFilter}`);
}

export function getProductById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteProduct(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function saveProduct(product) {
    if (!product.file)
        product.file = `https://picsum.photos/200/300?random=${Math.random()}`;

    if (product.id) {
        return axios.put(`${apiUrl}/${product.id}`, product);
    }

    return axios.post(`${apiUrl}`, product);
}