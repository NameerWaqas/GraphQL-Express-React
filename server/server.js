const express = require('express')
const cors = require('cors')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const schemaGraphQl  = require('./GraphQL/Schema')

app.use(cors())
app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema:schemaGraphQl
}))

app.get('/',(req,res)=>res.send('At Home'))


app.listen(5000)