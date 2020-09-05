import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client'
import { Card, Descriptions } from 'antd';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
})

const users = gql`
query getUsers {
  users{
    name,
    username,
    id,
    email,
    phone,
    website,
    company{
      name,
      catchPhrase,
      bs
    },
    address{
      street,
      suite,
      city,
      zipcode
    }
  }
}
`


function App() {


  return (
    <ApolloProvider client={client}>
      <div >
        <GQL />
      </div>
    </ApolloProvider>
  );
}

function GQL(props) {
  const { loading, error, data } = useQuery(users)
  if (!loading) {
    console.log(data.users)
  }
  return (
    <div>
      {
        loading ? <h1>Loading..</h1> :
          data.users.map(user => {
            return <Descriptions bordered column={{ lg: 3, md: 3, sm: 2, xs: 1 }} style={{ margin: "1%" }}>
              <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
              <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
              <Descriptions.Item label="User Name">{user.username}</Descriptions.Item>
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
              <Descriptions.Item label="Website">{user.website}</Descriptions.Item>
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
              <Descriptions.Item label="Company">
                Name: {user.company.name}<br/>
                Catch Phrase: {user.company.catchPhrase} <br/>
                BS: {user.company.bs}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                Street: {user.address.street}<br/>
                Suite: {user.address.suite} <br/>
                City: {user.address.city} <br/>
                Zip Code: {user.address.zipcode}
                </Descriptions.Item>
            </Descriptions>
          })
      }
    </div>
  )
}


export default App;
