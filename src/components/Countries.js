import React from 'react';
import { useQuery, gql } from '@apollo/client';

const COUNTRIES_QUERY = gql`
    query GetCountries {
        countries {
            code
            name
            emoji
        }
    }
`;

const Countries = () => {
	const { loading, error, data } = useQuery(COUNTRIES_QUERY);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			{data.countries.map(({ code, name, emoji }) => (
				<div key={code}>
					<h3>{name}</h3>
					<p>{emoji}</p>
				</div>
			))}
		</div>
	);
};

export default Countries;
