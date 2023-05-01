import React from 'react';
import { Link } from 'react-router-dom';

function CountryCard({ country, isFavorited, onFavoriteClick }) {
	return (
		<Link to={`/detail/${country.code}`} style={{ textDecoration: 'none', color: 'inherit' }}>
			<div className="country-card">
				<h3>
					{country.name} {country.emoji}
				</h3>
				<button onClick={(e) => { e.preventDefault(); onFavoriteClick(); }}>
					{isFavorited ? 'Unfavorite' : 'Favorite'}
				</button>
			</div>
		</Link>
	);
}

export default CountryCard;
