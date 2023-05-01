import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import CountryCard from '../components/CountryCard';


const COUNTRY_QUERY = gql`
    query Country($code: ID!) {
        country(code: $code) {
            name
            native
            capital
            emoji
            currency
            languages {
                code
                name
            }
        }
    }
`;

const ALL_COUNTRIES_QUERY = gql`
    query AllCountries {
        countries {
            code
            name
            emoji
        }
    }
`;

function SearchPage({ favorites, setFavorites }) {
	const [countryCode, setCountryCode] = useState(null);
	const { data, loading, error } = useQuery(COUNTRY_QUERY, {
		variables: { code: countryCode },
		skip: !countryCode,
	});
	const {
		data: allCountriesData,
		loading: allCountriesLoading,
		error: allCountriesError,
	} = useQuery(ALL_COUNTRIES_QUERY);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

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
			<style>
				{`
					.country-list {
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between; // Change to space-between
						margin: 20px 0;
						gap: 10px;
						width: 100%;
						padding: 0 10px; // Add padding to the left and right of the container
					}
					
					.country-card {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-between;
						background-color: #f5f5f5;
						border: 1px solid #e0e0e0;
						border-radius: 5px;
						padding: 15px;
						margin-bottom: 10px; // Remove left and right margins
						box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
						flex-basis: calc(25% - 20px); // Adjust the width to account for the new spacing
					}
				`}
			</style>
			<h3>Search Country Code</h3>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Country code (e.g., BR)"
					onChange={(e) => setCountryCode(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
			{data && data.country && (
				<CountryCard
					key={data.country.code}
					country={data.country}
					isFavorited={isFavorited(data.country)}
					onFavoriteClick={() => handleFavorite(data.country)}
				/>
			)}

			<br />
			<hr />

			{allCountriesLoading ? (
				<p>Loading countries...</p>
			) : allCountriesError ? (
				<p>Error loading countries :(</p>
			) : (
				<div>
					<h1>All Countries</h1>
					<div className="country-list">
						{allCountriesData.countries.map((country) => (
							<CountryCard
								key={country.code}
								country={country}
								isFavorited={isFavorited(country)}
								onFavoriteClick={() => handleFavorite(country)}
							/>
						))}
					</div>

				</div>
			)}
		</div>
	);
}

export default SearchPage;
