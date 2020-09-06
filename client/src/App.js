import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import APIData from './components/APIData'
import {ContextProvider} from './components/ContextAPI'
import UserControls from './components/UserControls'
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <ContextProvider >
        <div style={{width:"74vw",marginRight:'1vw'}}><APIData /></div>
        <div className="UserControls">
          <UserControls/>
        </div>
      </ContextProvider>
    </ApolloProvider>
  );
}




export default App;
