import React from 'react';
import CountryCard from '../components/CountryCard';

function FavoritesPage({ favorites, setFavorites }) {
	const handleFavorite = (country) => {
		setFavorites((prevFavorites) => {
			if (prevFavorites.some((fav) => fav.code === country.code)) {
				return prevFavorites.filter((fav) => fav.code !== country.code);
			} else {
				return [...prevFavorites, country];
			}
		});
	};

	const isFavorited = (country) => favorites.some((fav) => fav.code === country.code);

	return (
		<div>
			<h1>Favorites</h1>
			<ul>
				{favorites.map((favorite, index) => (
					<CountryCard
						key={favorite.code}
						country={favorite}
						isFavorited={isFavorited(favorite)}
						onFavoriteClick={() => handleFavorite(favorite)}
					/>
				))}
			</ul>
		</div>
	);
}

export default FavoritesPage;
