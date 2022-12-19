import {
    Route,
    Routes,
    BrowserRouter
} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';

function App() {

    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route index element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
