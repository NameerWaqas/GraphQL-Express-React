import React from 'react'
import {gql, useQuery } from '@apollo/client'
import { Card, Descriptions } from 'antd';

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

export default function GQL(props) {
    const { loading, error, data } = useQuery(users)
    if (loading) {
      return <h1>Loading</h1>
    }
    return (
      <div>
        {
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
