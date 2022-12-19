import "./Search.css"

function Search() {
    return (
        <div className="item" id="search">
            <div className="search-menu">
                <form action="/search"></form>
                <input type="text" placeholder="Search wallpapers" />
                <i className="fa fa-search"></i>
            </div>
        </div>
    );
}

export default Search;