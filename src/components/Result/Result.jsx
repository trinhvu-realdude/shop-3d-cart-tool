import { useLocation } from 'react-router-dom';
import { getAllCategories } from "../../api/fetchAPI"
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
        getAllCategories(accessToken).then(data => {
            setCategories(data);
            setLoading(false);
        }).catch(error => {
            setError(true);
            console.error(error);
        })
    }, [accessToken]);

    const handleActionClick = (categoryId) => {
        console.log(categoryId);
    }

    return (
        <div className="result-container">
            <h2>Empty Categories</h2>
            {!error ? (
                <>
                    {loading && categories.length === 0 ? <p>Loading...</p> : <p>Done! Found ${categories.length} empty categories.</p>}
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