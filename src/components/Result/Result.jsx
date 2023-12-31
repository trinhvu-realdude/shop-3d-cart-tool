import { useLocation } from "react-router-dom";
import {
    checkAll,
    checkProductsInside,
    getAllCategories,
} from "../../api/fetchAPI";
import { useEffect, useState } from "react";
import "./Result.css";

function Result() {
    const location = useLocation();
    const { storeUrl, accessToken } = location.state || {};
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [numberOfProducts, setNumberOfProducts] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    let [count, setCount] = useState(0);

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
            [categoryId]: "Checking...",
        }));

        const numberOfProducts = await checkProductsInside(
            accessToken,
            categoryId
        );

        if (numberOfProducts > 0) {
            setCategories((prevCategories) =>
                prevCategories.filter((c) => c.CategoryID !== categoryId)
            );
        }

        setNumberOfProducts((prev) => ({
            ...prev,
            [categoryId]: numberOfProducts,
        }));
    };

    // const checkAllClick = async () => {
    //     for (const category of categories) {
    //         const categoryId = category.CategoryID;

    //         setNumberOfProducts((prev) => ({
    //             ...prev,
    //             [categoryId]: "Checking...",
    //         }));

    //         const numberOfProducts = await checkProductsInside(
    //             accessToken,
    //             categoryId
    //         );

    //         setNumberOfProducts((prev) => ({
    //             ...prev,
    //             [categoryId]: numberOfProducts,
    //         }));

    //         if (numberOfProducts > 0) {
    //             setCategories((prevCategories) =>
    //                 prevCategories.filter((c) => c.CategoryID !== categoryId)
    //             );
    //         }
    //     }
    // };

    const checkWithQuantityClick = async () => {
        for (const category of selectedCategories) {
            const categoryId = category.CategoryID;

            setNumberOfProducts((prev) => ({
                ...prev,
                [categoryId]: "Checking...",
            }));
        }

        const emptyCategories = await checkAll(selectedCategories, accessToken);

        for (const category of emptyCategories) {
            const categoryId = category.CategoryID;

            if (category.NumberOfProducts > 0) {
                setCategories((prevCategories) =>
                    prevCategories.filter((c) => c.CategoryID !== categoryId)
                );
            }

            setNumberOfProducts((prev) => ({
                ...prev,
                [categoryId]: category.NumberOfProducts,
            }));
        }

        setSelectedCategories([]);
        setCount(0);
    };

    const checkAllClick = async () => {
        const filteredCategories = categories.slice(0, 50);

        for (const category of filteredCategories) {
            const categoryId = category.CategoryID;

            setNumberOfProducts((prev) => ({
                ...prev,
                [categoryId]: "Checking...",
            }));
        }

        const emptyCategories = await checkAll(filteredCategories, accessToken);

        for (const category of emptyCategories) {
            const categoryId = category.CategoryID;

            if (category.NumberOfProducts > 0) {
                setCategories((prevCategories) =>
                    prevCategories.filter((c) => c.CategoryID !== categoryId)
                );
            }

            setNumberOfProducts((prev) => ({
                ...prev,
                [categoryId]: category.NumberOfProducts,
            }));
        }
    };

    const deleteCategoryClick = (categoryId) => {
        console.log(categoryId);
        alert(`Do you want to delete category ${categoryId}?`);
    };

    const handleCheckboxChange = (categoryId) => {
        setSelectedCategories((prevSelected) => {
            const isSelected = prevSelected.some(
                (item) => item.CategoryID === categoryId
            );

            if (isSelected) {
                setCount(--count);
                return prevSelected.filter(
                    (item) => item.CategoryID !== categoryId
                );
            } else {
                setCount(++count);
                const categoryObject = categories.find(
                    (category) => category.CategoryID === categoryId
                );
                return [...prevSelected, categoryObject];
            }
        });
    };

    return (
        <div className="result-container">
            <h2>Empty Categories</h2>
            {!error ? (
                <>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="text-center">
                            <p>
                                Done! Found {categories.length} empty
                                categories.
                            </p>
                            {count !== 0 ? (
                                <button
                                    className="btn btn-success mb-2"
                                    onClick={() => checkWithQuantityClick()}
                                >
                                    Check {count}
                                </button>
                            ) : null}
                            <button
                                className="btn btn-success ml-2 mb-2"
                                onClick={() => checkAllClick()}
                            >
                                Check 50
                            </button>
                        </div>
                    )}
                    {categories.length > 0 && (
                        <div className="table-container">
                            <table className="table-bordered">
                                <thead>
                                    <tr>
                                        <th></th>
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
                                            <th>
                                                <div className="form-check form-check-inline ml-4">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`checkbox-${category.CategoryID}`}
                                                        checked={selectedCategories.some(
                                                            (selected) =>
                                                                selected.CategoryID ===
                                                                category.CategoryID
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                category.CategoryID
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </th>
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
