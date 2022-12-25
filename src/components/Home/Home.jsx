import { useEffect, useState } from "react";
import CardItem from "../CardItem/CardItem";
import "./Home.css";

function Home() {

    const [randomList, setRandomList] = useState([]);

    useEffect(() => {
        fetch("https://wallpaper-api.cyclic.app/api/v1/random-tags", {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => setRandomList(data.results));
    }, []);

    return (
        <div className="content-container">
            <div className="content-title">
                <h1 className="heading">Access to Thousands of Wallpaper</h1>
                <p className="description">Only the best wallpapers. Daily additions of new, awesome, HD wallpapers for desktop and phones.</p>
            </div>
            <div className="tag-collection">
                {
                    randomList && randomList.length > 0
                    ? randomList.map((tag, index) => (
                        <CardItem
                            key={index} 
                            tag={tag}
                        />
                    ))
                    : null
                }
            </div>
        </div>
    );
}

export default Home;