import { useState } from "react";
import "./Tool.css";
import { useNavigate } from "react-router-dom";

function Tool() {
    const navigate = useNavigate();
    const [storeUrl, setStoreUrl] = useState("");
    const [accessToken, setAccessToken] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!storeUrl.trim() || !accessToken.trim()) {
            alert("Store URL and Access Token are required.");
            return;
        }

        navigate("/result", {
            state: {
                storeUrl,
                accessToken,
            },
        });
    };

    return (
        <div className="container form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="storeUrlInput">Store URL:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="storeUrlInput"
                        name="storeUrlInput"
                        placeholder="Enter Store URL"
                        onChange={(e) => setStoreUrl(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="accessTokenInput">Access Token:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="accessTokenInput"
                        name="accessTokenInput"
                        placeholder="Enter Access Token"
                        onChange={(e) => setAccessToken(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Check empty categories
                </button>
            </form>
        </div>
    );
}

export default Tool;
