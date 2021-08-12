import React from 'react';
import {ApolloProvider} from "@apollo/client";
import client from "../apollo/apolloClient";
import 'isomorphic-unfetch';


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
