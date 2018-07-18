import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';

const isDev = process.env.NODE_ENV==="development";
console.log(isDev);

const GQL_API_ENDPOINT = isDev?"https://api.staging.cleargraph.com/":"https://api.cleargraph.com/";

const client = new ApolloClient({ uri: GQL_API_ENDPOINT });

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent apolloClient={client} />
  </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById('root'));
registerServiceWorker();
