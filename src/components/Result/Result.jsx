import { useLocation } from 'react-router-dom';
import { getAllCategories, getProducts } from "../../api/fetchAPI"
import { useEffect, useState } from 'react';
import "./Result.css"

function Result() {
    const location = useLocation();
    const { storeUrl, accessToken, limit } = location.state || {};
    const [categories, setCategories] = useState([]);
    const [emptyList, setEmptyList] = useState([]);
    const [loading, setLoading] = useState(true);

    // handle reload page
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (loading) {
                const message = 'Are you sure you want to leave? Data is still being processed.';
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [loading]);

    // get all categories
    useEffect(() => {
        getAllCategories(accessToken, limit).then(data => {
            setCategories(data);
        })
    }, [accessToken, limit]);

    const checkSubCategories = async (parentCategory, categories) => {
        setLoading(true);
        const subCategories = categories.filter(
            (cat) => cat.CategoryParent === parentCategory.CategoryID
        );

        if (subCategories.length === 0) {
            const products = await getProducts(accessToken, parentCategory.CategoryID);

            if (products.length === 0) {
                const emptyCategory = {
                    categoryId: parentCategory.CategoryID,
                    categoryName: parentCategory.CategoryName,
                    categoryUrl: `${storeUrl}${parentCategory.CustomFileName}`
                };

                setEmptyList(prevList => [...prevList, emptyCategory]);
            }
        }

        for (const subCategory of subCategories) {
            await checkSubCategories(subCategory, categories);
        }
        setLoading(false);
    }
    
    useEffect(() => {
        const parentCategories = categories.filter(
            (cat) => cat.CategoryParent === 0
        );

        for (const parentCategory of parentCategories) {
            checkSubCategories(parentCategory, categories);
        }
    }, [accessToken, categories]);

    const handleActionClick = (categoryId) => {
        console.log(categoryId);
    }

    return (
        <div className="result-container">
            <h2>Empty Categories</h2>
            {loading ? <p>Loading...</p> : <p>Done!</p>}
            {emptyList.length > 0 && (
                <div className="table-container">
                    <table className="table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>URL</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emptyList.map((emptyCategory) => (
                                <tr key={emptyCategory.categoryId}>
                                    <td>{emptyCategory.categoryId}</td>
                                    <td>{emptyCategory.categoryName}</td>
                                    <td>
                                        <a href={emptyCategory.categoryUrl} target="_blank" rel="noopener noreferrer">
                                            {emptyCategory.categoryUrl}
                                        </a>
                                    </td>
                                    <td>
                                        <button 
                                            type="button"
                                            disabled={loading} 
                                            className="btn btn-danger" 
                                            onClick={() => handleActionClick(emptyCategory.categoryId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Result;