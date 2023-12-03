import axios from "axios";

const BASE_URL = "https://shop-3d-cart-api.cyclic.app/api";

export const getAllCategories = async (token, limit) => {
    const response = await axios.get(`${BASE_URL}/categories/${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.data;
    return data;
};

export const getProducts = async (token, categoryId) => {
    const response = await axios.get(`${BASE_URL}/products/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.data;
    return data;
} 

export const deleteCategoryById = async(token, categoryId) => {
    const response = await axios.delete(`${BASE_URL}/delete/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.data;
    return data;
}