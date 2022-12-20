import { useEffect, useState } from "react";
import CardList from "../CardList/CardList";
import "./Home.css";

function Home() {

    const [randomList, setRandomList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/random-tags", {
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

            <CardList list={randomList}/>
        </div>
    );
}

export default Home;