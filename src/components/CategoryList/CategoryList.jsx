import { useEffect, useState } from "react";
import "./CategoryList.css";

function CategoryList() {

    const [categoryList, setCategoryList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch("https://wallpaper-api.cyclic.app/api/v1/categories", {
            method: "POST",
        })
        .then(response => response.json())
        .then(data => setCategoryList(data.results));
    }, []);

    const handleDropDown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="item" id="categories">
            <button 
                onClick={handleDropDown}
            >
                Catgories▾
            </button>
            <div 
                className="cat-list"
                style={{
                    visibility: isOpen ? "visible" : "hidden"
                }}
            >
                {
                    categoryList && categoryList.length > 0
                    ? categoryList.map((category, index) => (
                        <div className="category" key={index}>
                            <a href={category.url}>
                                {category.icon} {category.name}
                                
                            </a>
                        </div>
                        
                    )) : null
                }
            </div>
        </div>
    );
}

export default CategoryList;