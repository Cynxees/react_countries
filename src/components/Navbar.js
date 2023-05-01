import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
	return (
		<nav className="navbar">
			<Link to="/" className="navbar-item">
				Search
			</Link>
			<Link to="/favorites" className="navbar-item">
				Favorites
			</Link>
		</nav>
	);
}

export default Navbar;
