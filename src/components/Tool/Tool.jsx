import { useState } from "react";
import "./Tool.css";
import { useNavigate } from "react-router-dom";

function Tool() {

    const navigate = useNavigate();
    const [storeUrl, setStoreUrl] = useState('');
    const [accessToken, setAccessToken] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (!storeUrl.trim() || !accessToken.trim()) {
            alert('Store URL and Access Token are required.'); // You can customize this validation message
            return;
        }
        const limit = e.target.elements.limitInput.value;

        navigate("/result", {
            state: {
                storeUrl,
                accessToken,
                limit
            }
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

                <div className="form-group">
                    <label htmlFor="limitInput">Limit:</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        name="limitInput" 
                        id="limitInput" 
                        defaultValue={100}
                        min={100}
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
