import React, { useEffect, useState } from 'react';
import {
    Route,
    Routes,
    BrowserRouter as Router,
} from 'react-router-dom';
import './App.css';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import ImageScreen from './components/ImageScreen/ImageScreen';
import NavBar from './components/NavBar/NavBar';
import SearchScreen from './components/SearchScreen/SearchScreen';
import TagScreen from './components/TagScreen/TagScreen';

function App() {
    const [buttonOnTop, setButtonOnTop] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setButtonOnTop(window.scrollY >= 200 ? !buttonOnTop : buttonOnTop)
        })
    }, []);

    const handleToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    };

    return (
        <Router>
            <React.Fragment>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/cat/:category" element={<TagScreen/>}/>
                    <Route path="/:tag/:title/:category" element={<ImageScreen/>}/>
                    <Route path="/search" element={<SearchScreen/>}/>
                </Routes>

                <Footer/>

                <button
                    className="gototop"
                    onClick={handleToTop}
                    style={{
                        visibility: buttonOnTop ? "visible" : "hidden"
                    }}
                >
                    <i className="fa fa-angle-up"></i>
                </button>
            </React.Fragment>
        </Router>
    );
}

export default App;
