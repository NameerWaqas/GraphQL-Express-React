import React from 'react';
import './App.css';
import {ApolloClient,InMemoryCache,ApolloProvider,gql,useQuery} from '@apollo/client'


const client =new ApolloClient({
  uri:"http://localhost:5000/graphql",
  cache:new InMemoryCache()
})

const users = gql `
query getUsers {
  users{
    name,
    id
  }
}
`


function App() {


  return (
    <ApolloProvider client={client}>
    <div className="App">
    <h1>Hello world of GQL</h1>
    <GQL/>
    </div>
    </ApolloProvider>
  );
}

function GQL(props){
  const {loading,error,data} = useQuery(users)
  if(!loading){
    console.log(data.users)
  }
  return(
    <div>
      {
        loading?<h1>Loading..</h1>:data.users.map(user=><div key={user.id}><h3>{user.id} {user.name}</h3></div>)
      }
    </div>
  )
}


export default App;
