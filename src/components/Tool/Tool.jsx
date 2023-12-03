import "./Tool.css"

function Tool() {
    return (
        <div className="container form-container">
            <form>
                <div className="form-group">
                    <label htmlFor="storeUrlInput">Store URL:</label>
                    <input type="text" className="form-control" id="storeUrlInput" placeholder="Enter Store URL" />
                </div>

                <div className="form-group">
                    <label htmlFor="accessTokenInput">Access Token:</label>
                    <input type="text" className="form-control" id="accessTokenInput" placeholder="Enter Access Token" />
                </div>

                <button type="submit" className="btn btn-primary">Check empty categories</button>
            </form>
        </div>
    );
}

export default Tool;