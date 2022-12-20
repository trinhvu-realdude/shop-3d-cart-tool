import { Outlet } from "react-router-dom";
import CategoryList from "../CategoryList/CategoryList";
import Search from "../Search/Search";
import "./NavBar.css";

function NavBar() {
    return (
        <>
                <nav className="navbar">
                    <div className="navbar-menu">
                        <div className="item" id="logo">
                            <a href="/">
                                WallpaperParadise
                            </a>
                        </div>
                        <Search/>
                        <div className="item social">
                            <a href="/#">
                                <img 
                                    src="https://wallpaperaccess.com/ig.png" 
                                    title="Instagram"
                                    alt="Instagram" 
                                    style={{
                                        height: "40px",
                                        width: "auto"
                                    }}
                                />
                            </a>
                        </div>
                        <div className="item social">
                            <a href="/#">
                                <img 
                                    src="https://wallpaperaccess.com/tw.png" 
                                    title="Twitter"
                                    alt="Twitter" 
                                    style={{
                                        height: "40px",
                                        width: "auto"
                                    }}
                                />
                            </a>
                        </div>
                        <CategoryList/>
                    </div>
                </nav> 
            <Outlet/>
        </>
    );
}

export default NavBar;