import { useLocation } from "react-router-dom";
import { checkProductsInside, getAllCategories } from "../../api/fetchAPI";
import { useEffect, useState } from "react";
import "./Result.css";

function Result() {
    const location = useLocation();
    const { storeUrl, accessToken } = location.state || {};
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [numberOfProducts, setNumberOfProducts] = useState({});

    // handle reload page
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (loading) {
                const message =
                    "Are you sure you want to leave? Data is still being processed.";
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [loading]);

    // get all categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allCategories = await getAllCategories(accessToken);
                setCategories(allCategories);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error("An error occurred:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [accessToken]);

    const checkProductsInsideClick = async (categoryId) => {
        setNumberOfProducts((prev) => ({
            ...prev,
            [categoryId]: "Checking products...",
        }));

        const numberOfProducts = await checkProductsInside(
            accessToken,
            categoryId
        );

        setNumberOfProducts((prev) => ({
            ...prev,
            [categoryId]: numberOfProducts,
        }));
    };

    const deleteCategoryClick = (categoryId) => {
        console.log(categoryId);
        alert(`Do you want to delete category ${categoryId}?`);
    };

    return (
        <div className="result-container">
            <h2>Empty Categories</h2>
            {!error ? (
                <>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>Done! Found {categories.length} empty categories.</p>
                    )}
                    {categories.length > 0 && (
                        <div className="table-container">
                            <table className="table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>URL</th>
                                        <th>Number of products</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.CategoryID}>
                                            <td>{category.CategoryID}</td>
                                            <td>{category.CategoryName}</td>
                                            <td>
                                                <a
                                                    href={`${storeUrl}${category.CustomFileName}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {category.CustomFileName}
                                                </a>
                                            </td>
                                            <td
                                                id={`products-${category.CategoryID}`}
                                                className="products-check"
                                            >
                                                {numberOfProducts[
                                                    category.CategoryID
                                                ] === undefined ? (
                                                    <p>Not checked yet</p>
                                                ) : (
                                                    <p>
                                                        {
                                                            numberOfProducts[
                                                                category
                                                                    .CategoryID
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </td>
                                            <td>
                                                <div
                                                    className="btn-group"
                                                    role="group"
                                                    aria-label="Actions"
                                                >
                                                    <button
                                                        type="button"
                                                        disabled={loading}
                                                        className="btn btn-success"
                                                        onClick={() =>
                                                            checkProductsInsideClick(
                                                                category.CategoryID
                                                            )
                                                        }
                                                    >
                                                        Check
                                                    </button>
                                                    <button
                                                        id={`button-delete-${category.CategoryID}`}
                                                        type="button"
                                                        disabled={
                                                            numberOfProducts[
                                                                category
                                                                    .CategoryID
                                                            ] !== 0
                                                        }
                                                        className="btn btn-danger button-delete"
                                                        onClick={() =>
                                                            deleteCategoryClick(
                                                                category.CategoryID
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <p style={{ color: "red" }}>
                        Something wrong. Please <a href="/">try again.</a>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Result;
