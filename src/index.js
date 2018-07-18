import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import querystring from 'querystring';

import './index.css';
import App from './App';

const isDev = querystring.parse(window.location.search.slice(1)).isDev;

const GQL_API_ENDPOINT = isDev?"https://api.staging.cleargraph.com/":"https://api.cleargraph.com/";
console.log(`isDev: ${isDev}`);

const client = new ApolloClient({ uri: GQL_API_ENDPOINT });

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent apolloClient={client} />
  </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById('root'));
registerServiceWorker();
