import { gql } from '@apollo/client';

export const SEARCH_TRACKS = gql`
    query SearchTracks($query: String!) {
        queryArtists(byName: $query) {
            name
            id
            image
            albums {
                name
                id
                image
                tracks {
                    name
                    id
                    preview_url
                }
            }
        }
    }
`;
