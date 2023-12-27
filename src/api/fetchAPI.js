import axios from "axios";

const BASE_URL = "https://shop-3d-cart-api.vercel.app/api";
// const BASE_URL = "http://localhost:5000/api";

export const getAllCategories = async (token) => {
    const response = await axios.get(`${BASE_URL}/getAllCategories`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const data = await response.data;
    return data;
};

export const checkProductsInside = async (token, categoryId) => {
    const response = await axios.get(`${BASE_URL}/checkProductsInside/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.data;
    return data;
}

export const deleteCategoryById = async (token, categoryId) => {
    const response = await axios.delete(`${BASE_URL}/delete/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const data = await response.data;
    return data;
};
