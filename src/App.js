import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Tool from "./components/Tool/Tool";

function App() {
    return (
        <Router>
            <React.Fragment>
                <Routes>
                    <Route path="/" element={<Tool />} />
                </Routes>
            </React.Fragment>
        </Router>
    );
}

export default App;
