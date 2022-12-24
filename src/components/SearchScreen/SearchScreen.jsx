import { useEffect } from "react";

export default function SearchScreen() {

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const q = params.get("q");

        console.log(q);

    }, []);

    return (
        <div className="content-container">

        </div>
    );
}