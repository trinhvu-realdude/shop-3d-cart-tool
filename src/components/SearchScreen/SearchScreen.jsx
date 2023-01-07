import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { search } from "../../api/fetchAPI";
import CardItem from "../CardItem/CardItem";

export default function SearchScreen() {

    const [q] = useSearchParams();

    const [lengthSearch, setLengthSearch] = useState(0);
    const [listSearch, setListSearch] = useState([]);

    useEffect(() => {
        search(q.get("q"))
        .then(data => {
            setLengthSearch(data.length);
            setListSearch(data.results);
        })
    }, [q]);

    return (
        lengthSearch !== 0
        ? <div className="content-container">
            <div className="content-title">
                <h1 className="heading">Search result for {q.get("q")}</h1>
                <p 
                    className="description"
                    style={{
                        opacity: ".5"
                    }}
                >
                    {lengthSearch} results
                </p>
            </div>

            <div className="tag-collection">
                {
                    listSearch.map((tagSearch, index) => (
                        <CardItem
                            key={index}
                            tag={tagSearch}
                        />
                    ))
                }
            </div>
        </div>
        : <div className="content-container">
            <div className="content-title">
                <h1 className="heading">Search result for {q.get("q")}</h1>
                <p 
                    className="description"
                    style={{
                        opacity: ".5"
                    }}
                >
                    {lengthSearch} results
                </p>
                <p className="description">
                    Sorry, no wallpapers found for '{q.get("q")}'.
                </p>
            </div>
        </div>
    );
}