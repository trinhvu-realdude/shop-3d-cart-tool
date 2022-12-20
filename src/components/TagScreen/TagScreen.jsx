import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardList from "../CardList/CardList";
import ContentTitle from "../ContentTitle/ContentTitle";

export default function TagScreen() {
    let {category} = useParams();

    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/tags/${category}`, {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => setList(data.results));
    }, [category]);

    return (
        <div className="content-container">
            <ContentTitle title={category.substring(0, 1).toUpperCase() + category.substring(1)}/>
            <CardList list={list}/>
        </div>
    );
}