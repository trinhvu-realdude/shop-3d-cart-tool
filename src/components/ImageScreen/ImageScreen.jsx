import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageItem from "../ImageItem/ImageItem";

export default function ImageScreen() {

    let {tag, category, title} = useParams();

    const [list, setList] = useState([]);
    const [relatedTags, setRelatedTags] = useState([]);
    const [isStopLoading, setIsStopLoading] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/${tag}/${category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Something went wrong");
        })
        .then(data => setList(data.results))
        .catch(err => console.log(err));

        fetch("http://localhost:5000/api/v1/related", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category,
                currentTag: title
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Something went wrong");
        })
        .then(data => setRelatedTags(data.results))
        .catch(err => console.log(err));

        setTimeout(() => setIsStopLoading(true), 10000);
    }, [category, tag, title]);

    return (
        list && list.length > 0 ?
            <div className="content-container">
                <div className="content-title">
                    <h1 className="heading">{title}</h1>
                    <p className="description">
                        A collection of the top {list.length + " " + title.replace("Wallpaper", "")} wallpapers and backgrounds available for download for free. 
                        We hope you enjoy our growing collection of HD images to use as a background or home screen for your smartphone or computer. 
                        Please <a href="/contact" style={{textDecoration: "none", color: "#4183c4"}}>contact us</a> if you want to publish a <strong>{title.replace("Wallpaper", "")}</strong> wallpaper on our site.
                    </p>
                    <a href="#related">
                        Related wallpapers
                    </a>
                </div>

                <div className="image-collection">
                    {
                        list.map((image) => (
                            <ImageItem key={image.id} image={image}/>
                        ))
                    }
                </div>

                <div className="related-collection" id="related">
                    <div className="content-title">
                        <h1 className="heading">Related Wallpapers</h1>
                    </div>
                    <div 
                        className="tag-collection" 
                        style={{
                            padding: "0 112px"
                        }}  
                    >
                        {
                            relatedTags && relatedTags.length > 0
                            ? relatedTags.map((tag, index) => (
                                <div 
                                    className="card-item" 
                                    key={index}
                                >
                                    <a href={tag.url + `/${tag.folderName}` + tag.category} title={tag.title}>
                                        <img 
                                            src={tag.thumbSource}
                                            alt={tag.title} 
                                            style={{
                                                borderRadius: "10px",
                                                width: "400px"
                                            }}
                                        />
                                        <div className="card-title">
                                            <span>{tag.name} </span>
                                            <span 
                                                className="quantity" 
                                                style={{
                                                    fontWeight: "lighter",
                                                    color: "#999",
                                                    fontSize: "14px"
                                                }}
                                            >
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            ))
                            : null
                        }
                    </div>
                </div>
            </div>
        : 
        <div className="content-container">
            {
                isStopLoading
                ? <div className="error">
                    <h1 className="heading" style={{fontSize: "25px"}}>Oops! Something went wrong. 😭</h1>
                    <p>
                        Sorry, something went wrong there. Please try again or contact us for help.
                        <br />
                        <br />
                        <a 
                            href="/"
                            style={{
                                textDecoration: "none",
                                fontWeight: "bold",
                                color: "#4183c4"
                            }}
                        >
                            Back to home &#8594;
                        </a>
                    </p>
                </div>
                : <div className="loader"></div>
            }
        </div>
    );
}