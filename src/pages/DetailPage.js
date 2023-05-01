import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

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

function DetailPage() {
	const { id } = useParams();
	const { data, loading, error } = useQuery(COUNTRY_QUERY, {
		variables: { code: id },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const country = data.country;

	return (
		<div>
			<h2>
				{country.name} {country.emoji}
			</h2>
			<p>Native name: {country.native}</p>
			<p>Capital: {country.capital}</p>
			<p>Currency: {country.currency}</p>
			<p>Languages:</p>
			<ul>
				{country.languages.map((language) => (
					<li key={language.code}>{language.name}</li>
				))}
			</ul>
		</div>
	);
}

export default DetailPage;
