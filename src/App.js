import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';
import Countries from './components/Countries';

function App() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(loadedFavorites);
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<SearchPage favorites={favorites} setFavorites={setFavorites} />} />
                <Route path="/detail/:id" element={<DetailPage/>} />
                <Route path="/favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites}/>} />
                <Route path="/countries" element={<Countries />} />
            </Routes>
        </Router>
    );
}

export default App;

