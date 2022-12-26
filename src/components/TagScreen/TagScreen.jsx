import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardItem from "../CardItem/CardItem";

export default function TagScreen() {
    let {category} = useParams();

    category = category.length > 2 ? category.substring(0, 1).toUpperCase() + category.substring(1) : category.toUpperCase();

    const title = category + " Wallpapers";

    document.title = title + " - WallpaperParadise";

    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`https://wallpaper-api.cyclic.app/api/v1/tags/${category}`, {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => setList(data.results));
    }, [category]);

    return (
        <div className="content-container">
            <div className="content-title">
                <h1 className="heading">{title}</h1>
                <p className="description">Only the best wallpapers. Daily additions of new, awesome, HD wallpapers for desktop and phones.</p>
            </div>
            <div className="tag-collection">
                {
                    list && list.length > 0
                    ? list.map((tag, index) => (
                        <CardItem
                            key={index} 
                            tag={tag}
                        />
                    ))
                    : <div className="loader"></div>
                }
            </div>
        </div>
    );
}