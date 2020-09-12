const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} = require('graphql')

const axios = require('axios')


let fetchUserData = () => {
    axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        usersData = res.data
    }
    )
}

// Users Data
let usersData = fetchUserData()

// Custom User Location

const customUserLocation = new GraphQLObjectType({
    name: "customGeoType",
    fields: {
        lat: { type: GraphQLString },
        lng: { type: GraphQLString }
    }
})

// Custom user Address
const customUserAddress = new GraphQLObjectType({
    name: "customAddressType",
    fields: {
        street: { type: GraphQLString },
        suite: { type: GraphQLString },
        city: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        geo: { type: customUserLocation }
    }
})

//Custom Company
const customCompanyType = new GraphQLObjectType({
    name: "customCompanyType",
    fields: {
        name: { type: GraphQLString },
        catchPhrase: { type: GraphQLString },
        bs: { type: GraphQLString }
    }
})

//Custom User Type
const customUserType = new GraphQLObjectType({
    name: "customUserType",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: customUserAddress },
        phone: { type: GraphQLString },
        website: { type: GraphQLString },
        company: { type: customCompanyType }
    }
})

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        users: {
            type: GraphQLList(customUserType),
            resolve: (parentData, args) => {
                return usersData
            }
        },
        user: {
            type: customUserType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parentData, args) => {
                return usersData[args.id - 1]
            }
        }
    }
})

let mutation = new GraphQLObjectType({
    name: "mutations",
    fields: {
        addUser: {
            type:GraphQLList(customUserType),
            args: {
                id: { type: GraphQLInt },
                name: { type: GraphQLString },
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                street: { type: GraphQLString },
                suite: { type: GraphQLString },
                city: { type: GraphQLString },
                zipcode: { type: GraphQLString },
                lat: { type: GraphQLString },
                lng: { type: GraphQLString },
                phone: { type: GraphQLString },
                website: { type: GraphQLString },
                cname: { type: GraphQLString },
                catchPhrase: { type: GraphQLString },
                bs: { type: GraphQLString }
            },
            resolve: (parentData, args) => {
                usersData.push({
                    id: args.id,
                    name: args.name,
                    username: args.username,
                    email: args.email,
                    address:{
                        street:args.street,
                        suite:args.suite,
                        city:args.city,
                        zipcode:args.zipcode,
                        geo:{
                            lat:args.lat,
                            lng:args.lng
                        }
                    },
                    phone: args.phone,
                    website: args.website,
                    company:{
                        name:args.cname,
                        catchPhrase:args.catchPhrase,
                        bs:args.bs
                    }
                })
                return usersData
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
})