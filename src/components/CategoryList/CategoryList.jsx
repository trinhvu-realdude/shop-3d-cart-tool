import { useEffect, useState } from "react";
import { getCategories } from "../../api/fetchAPI";
import "./CategoryList.css";

function CategoryList() {

    const [categoryList, setCategoryList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getCategories().then(data => {
            setCategoryList(data);
        });
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