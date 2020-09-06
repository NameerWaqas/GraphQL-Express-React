import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import GQL from './components/GQLComponent'

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div >
        <GQL />
      </div>
    </ApolloProvider>
  );
}




export default App;
