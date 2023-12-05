import { useLocation } from 'react-router-dom';
import { getAllCategories, getProductsByOffset } from "../../api/fetchAPI"
import { useEffect, useState } from 'react';
import "./Result.css"

function Result() {
    const location = useLocation();
    const { storeUrl, accessToken } = location.state || {};
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
        const fetchData = async () => {
            try {
                const allCategories = await getAllCategories(accessToken);
                const validCategories = await getValidCategories(allCategories, accessToken);
                setCategories(validCategories);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error('An error occurred:', error);
                setLoading(false);
            }
        };
      
        fetchData();
    }, [accessToken]);

    const getValidCategories = async (categories, accessToken) => {
        const validCategoriesList = new Set();
        let i = 0;
    
        while (true) {
            try {
                const products = await getProductsByOffset(accessToken, i);
        
                products.forEach((product) => {
                const categoryList = product.CategoryList;
                    categoryList.forEach((category) => {
                        validCategoriesList.add(category.CategoryID);
                    });
                });
        
                i += 200;
            } catch (error) {
                if (error.response && error.response.status === 500) {
                // Handle other errors if needed
                console.error('An error occurred:', error);
                break;
                }
            }
        }
    
        const emptyCategoryIds = categories
            .filter((category) => !validCategoriesList.has(category.CategoryID))
            .map((category) => category.CategoryID);
    
        const finalResult = categories.filter((category) => emptyCategoryIds.includes(category.CategoryID));
    
        return finalResult;
    };
    

    
    const handleActionClick = (categoryId) => {
        console.log(categoryId);
    }

    return (
        <div className="result-container">
            <h2>Empty Categories</h2>
            {!error ? (
                <>
                    {loading ? <p>Loading...</p> : <p>Done! Found {categories.length} empty categories.</p>}
                    {categories.length > 0 && (
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
                                    {categories.map((category) => (
                                        <tr key={category.CategoryID}>
                                            <td>{category.CategoryID}</td>
                                            <td>{category.CategoryName}</td>
                                            <td>
                                                <a href={`${storeUrl}${category.CustomFileName}`} target="_blank" rel="noopener noreferrer">
                                                    {category.CustomFileName}
                                                </a>
                                            </td>
                                            <td>
                                                <button 
                                                    type="button"
                                                    disabled={loading} 
                                                    className="btn btn-danger" 
                                                    onClick={() => handleActionClick(category.CategoryID)}
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
                </>
            ) : 
            <div>
                <p style={{color: "red"}}>Something wrong. Please <a href="/">try again.</a></p>
            </div>}
        </div>
    );
}

export default Result;