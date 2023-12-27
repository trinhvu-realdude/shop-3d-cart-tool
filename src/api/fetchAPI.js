import axios from "axios";

const BASE_URL = "https://shop-3d-cart-api.vercel.app/api";
// const BASE_URL = "http://localhost:5000/api";

// export const getAllCategories = async (token) => {
//     const response = await axios.get(`${BASE_URL}/getAllCategories`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//     });
//     const data = await response.data;
//     return data;
// };

// export const checkProductsInside = async (token, categoryId) => {
//     const response = await axios.get(`${BASE_URL}/checkProductsInside/${categoryId}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//     });

//     const data = await response.data;
//     return data;
// }

// export const deleteCategoryById = async (token, categoryId) => {
//     const response = await axios.delete(`${BASE_URL}/delete/${categoryId}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//     });
//     const data = await response.data;
//     return data;
// };

export const getAllCategories = async (token) => {
    const limit = 10000;
    let offset = 0;
    let allCategories = [];
    let emptyCategories = [];

    try {
        while (true) {
            const apiResponse = await axios.get(
                `https://apirest.3dcart.com/3dCartWebAPI/v2/Categories?limit=${limit}&offset=${offset}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const categories = apiResponse.data;

            if (categories.length === 0) {
                break;
            }

            allCategories = allCategories.concat(categories);

            offset += limit;

            console.log(`Found ${categories.length} categories`);
        }
    } catch (error) {
        if (error.response.status === 404) {
            const subCategories = cleanCategories(allCategories).filter(
                (cat) => cat.CategoryParent !== 0
            );

            const leafCategories = new Set();
            for (const subCategory of subCategories) {
                findLeafCategories(subCategory, leafCategories, allCategories);
            }

            emptyCategories = Array.from(leafCategories)
                .map((categoryId) => {
                    const category = subCategories.find(
                        (category) => category.CategoryID === categoryId
                    );
                    return category;
                })
                .filter((cat) => cat !== undefined);

            console.log(`Found ${emptyCategories.length} empty categories`);

            return emptyCategories;
        } else {
            console.error("Error fetching categories:", error.code);
        }
    }

    function cleanCategories(categories) {
        const counts = {};
        categories.forEach((category) => {
            counts[category.CustomFileName] =
                (counts[category.CustomFileName] || 0) + 1;
        });

        return categories.filter(
            (category) => counts[category.CustomFileName] === 1
        );
    }

    function findLeafCategories(subCategory, leafCategories, categories) {
        const subList = categories.filter(
            (cat) => cat.CategoryParent === subCategory.CategoryID
        );

        if (subList.length === 0) {
            leafCategories.add(subCategory.CategoryID);
        }

        for (const sub of subList) {
            findLeafCategories(sub, leafCategories, categories);
        }
    }
};

export const checkProductsInside = async (token, categoryId) => {
    try {
        const response = await axios.get(
            `https://apirest.3dcart.com/3dCartWebAPI/v2/Categories/${categoryId}/Products`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const result = response.data;
        console.log(
            `Found ${result.length} products in category ${categoryId}`
        );
        return result.length;
    } catch (error) {
        console.error("Axios error:", error);
    }
};
