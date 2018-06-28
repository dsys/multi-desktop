import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';

const GQL_API_ENDPOINT = "https://api.multi.app/";

const client = new ApolloClient({ uri: GQL_API_ENDPOINT });

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent apolloClient={client} />
  </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById('root'));
registerServiceWorker();
