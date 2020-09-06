import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Descriptions } from 'antd';
import { context } from './ContextAPI'


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
      zipcode,
    }
  }
}
`

export default function APIData(props) {
  const { loading, data } = useQuery(users)
  const [query, setQuery] = useContext(context)

  if (loading) {
    return <h1>Loading</h1>
  }
  else {
    return (
      <div>
        {
          data.users.map(user => {
            return <Descriptions key={user.id} bordered column={{ lg: 3, md: 3, sm: 2, xs: 1 }} style={{ margin: "1%" }}>
              <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
              <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
              <Descriptions.Item label="User Name">{user.username}</Descriptions.Item>
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
              <Descriptions.Item label="Website">{user.website}</Descriptions.Item>
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
              <Descriptions.Item label="Company">
                Name: {user.company.name}<br />
                  Catch Phrase: {user.company.catchPhrase} <br />
                  BS: {user.company.bs}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                Street: {user.address.street}<br />
                  Suite: {user.address.suite} <br />
                  City: {user.address.city} <br />
                  Zip Code: {user.address.zipcode}
              </Descriptions.Item>
            </Descriptions>
          })
        }
      </div>
    )
  }
}
