import { ApolloServer, gql } from "apollo-server";
const persons = [
    {
        name: 'John',
        age: 30,
        city : 'New York'
    },
    {
        name: 'Jane',
        age: 25,
        city : 'Chicago'
    },
    {
        name: 'Jim',
        age: 27,
        city : 'New Orleans'
    }
];

// describir los datos, segundo type es describir la peticion
const typeDefs = gql`
    type Person {
        name: String!
        age: Int!
        city: String!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args;
            return persons.find( pers => pers.name === name)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
})
