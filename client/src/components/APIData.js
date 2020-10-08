import React, { useContext, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Descriptions, Input, Button } from 'antd';
import { context } from './ContextAPI';


function GenerateQuery() {

  let contextVar = useContext(context)
  let query = contextVar[0]
  let setSnap = contextVar[5]

  let queryParams = `
      ${query.name ? "name ," : " "}
      ${query.username ? "username ," : " "}
      ${query.id ? "id ," : " "}
      ${query.email ? "email ," : " "}
      ${query.phone ? "phone ," : " "}
      ${query.website ? "website ," : " "}
      ${query.company ? `
      company{
        name,
        catchPhrase,
        bs
      } ,
      `: " "}
      ${query.address ? `
      address{
        street,
        suite,
        city,
        zipcode,
      }
      `: " "}
     
  `
  setSnap(queryParams)

  let queryResponse = gql`
      query getUsers{
        users{
          ${queryParams}
        }
      }
`
  return queryResponse;
}


function DescriptionsForm(props) {
  let [change, setChange] = useState({
    "id": "", "name": "", "username": "", "email": "",
    "phone": "", "website": "", "city": "", "suite": "",
    "street": "", "zipcode": "", "cname": "", "catchPhrase": "", "bs": ""
  })
  let handleChange = (e) => {
    const eVal = e.target.value
    const eName = e.target.name
    setChange((prevState) => {
      console.log(prevState)
      return { ...prevState, [eName]: eVal }
    })
  }

  let handleAddUser = () => {
    // let addUserQuery = gql `
    // mutation {
    //   addUser(id:${change.id},name:${change.name},username:${change.username},email:${change.email},
    //           phone:${change.phone},website:${change.website},city:${change.city},suite:${change.suite}
    //           ,street:${change.street},zipcode:${change.zipcode},cname:${change.cname},bs:${change.bs}
    //           ,catchPhrase:${change.catchPhrase},lat:"00",lng:"00")
    //           {
    //     id
    //   }
    // }     
    // `
    // let testAdd = gql `
    // mutation adduser(){
    //   addUser(id:"12",name:"n",username:"b",email:"c",phone:"d",website:"e",city:"f",street:"g",suite:"h",zipcode:"i"
    //   ,cname:"A",bs:"B",catchPhrase:"C",lat:"90",lng:"92"){id}
    // }
    // `
    // console.log(testAdd)
  }

  return (
    <Descriptions bordered column={{ lg: 2, md: 2, sm: 2, xs: 1 }} style={{ margin: "1%" }}>
      <Descriptions.Item label="ID">
        <Input placeholder="ID" name="id" onChange={(e) => handleChange(e)} />
      </Descriptions.Item>
      <Descriptions.Item label="Name">
        <Input placeholder="Name" name="name" onChange={(e) => handleChange(e)} />
      </Descriptions.Item>
      <Descriptions.Item label="Username">
        <Input placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
      </Descriptions.Item>
      <Descriptions.Item label="Email">
        <Input placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
      </Descriptions.Item>
      <Descriptions.Item label="Phone">
        <Input placeholder="Phone" name="phone" onChange={(e) => handleChange(e)} />
      </Descriptions.Item>
      <Descriptions.Item label="Website">
        <Input placeholder="Website" name="website" onChange={(e) => handleChange(e)} />
      </Descriptions.Item>
      <Descriptions.Item label="Company">
        <Input placeholder="Company name" name="cname" onChange={(e) => handleChange(e)} />
        <Input placeholder="Catch phrase" name="catchPhrase" onChange={(e) => handleChange(e)} />
        <Input placeholder="BS" name="bs" onChange={(e) => handleChange(e)} />
      </Descriptions.Item>
      <Descriptions.Item label="address">
        <Input placeholder="Street" name="street" onChange={(e) => handleChange(e)} />
        <Input placeholder="Suite" name="suite" onChange={(e) => handleChange(e)} />
        <Input placeholder="City" name="city" onChange={(e) => handleChange(e)} />
        <Input placeholder="Zip code" name="zipcode" onChange={(e) => handleChange(e)} />
        <Button style={{ marginTop: "1%" }} onClick={handleAddUser}>Add User</Button>
      </Descriptions.Item>
    </Descriptions>
  )
}


export default function APIData(props) {
  const { loading, data } = useQuery(GenerateQuery())

  if (loading) {
    return <h1>Loading</h1>
  }
  else {
    return (
      <div>
        <DescriptionsForm />
        {
          data.users.map(user => {
            return <Descriptions key={user.id} bordered column={{ lg: 3, md: 3, sm: 2, xs: 1 }} style={{ margin: "1%" }}>
              <Descriptions.Item label="ID">{user.id}</Descriptions.Item>

              <Descriptions.Item label="Name">{user.name}</Descriptions.Item>

              {user.username != undefined ? <Descriptions.Item label="User Name">{user.username}</Descriptions.Item> :
                <Descriptions.Item label="User Name">N/A</Descriptions.Item>}

              {user.email != undefined ? <Descriptions.Item label="Email">{user.email}</Descriptions.Item> :
                <Descriptions.Item label="Email">N/A</Descriptions.Item>}

              {user.phone != undefined ? <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item> :
                <Descriptions.Item label="Phone">N/A</Descriptions.Item>}

              {user.website != undefined ? <Descriptions.Item label="Website">{user.website}</Descriptions.Item> :
                <Descriptions.Item label="Website">N/A</Descriptions.Item>}

              {user.company != undefined ? <Descriptions.Item label="Company">
                Name: {user.company.name}<br />
                  Catch Phrase: {user.company.catchPhrase} <br />
                  BS: {user.company.bs}
              </Descriptions.Item> :
                <Descriptions.Item label="Company">
                  N/A
            </Descriptions.Item>
              }

              {user.address != undefined ? <Descriptions.Item label="Address">
                Street: {user.address.street}<br />
                  Suite: {user.address.suite} <br />
                  City: {user.address.city} <br />
                  Zip Code: {user.address.zipcode}
              </Descriptions.Item> :
                <Descriptions.Item label="Address">
                  N/A
            </Descriptions.Item>}
            </Descriptions>
          })
        }
      </div>
    )
  }
}
