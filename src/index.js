import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);
