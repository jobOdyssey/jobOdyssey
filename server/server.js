const express = require('express');
const dotenv = require('dotenv');
// const { Sequelize, DataTypes } = require('sequelize');
const { ApolloServer, gql } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { User, Application } = require('./sequelize.js');

// Express set up
const app = express();

// Setting up environment variables
dotenv.config();

// SEQUELIZE TESTS
User.findAll().then((res) => res.forEach((user) => console.log(user.dataValues.id)));

// graphQL typeDefs
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Date and Timestamp types
  scalar DateType
  scalar TimestampType

  # Enum type for status
  enum Status {
    PLANNED
    APPLIED
    REJECTED
    INTERVIEW_SCHEDULED
    OFFERED
  }

  type Error {
    field: String
    message: String
  }

  # User type
  type User {
    id: ID
    username: String
    email: String
    password: String
  }

  type AddResponse {
    errors: [Error]
    user: User
  }

  # Application type
  type Application {
    id: ID
    user_id: String
    company: String
    position: String
    url: String
    created_at: DateType
    recent_activity: TimestampType
    status: Status
    notes: String
  }

  # Input types for reusable inputs
  input UserInfo {
    username: String!
    password: String!
    email: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "applications" query returns an array of zero or more applications (defined above).
  type Query {
    hello: String
    applications: [Application]
    users: [User]
  }

  type Mutation {
    addUser(userInfo: UserInfo!): AddResponse
    login(userInfo: UserInfo!): String
    test: String
  }
`;

// graphQL resolvers
const resolvers = {
  DateType: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  TimestampType: new GraphQLScalarType({
    name: 'Timestamp',
    serialize(date) {
      return date instanceof Date ? date.getTime() : null;
    },
    parseValue(date) {
      try {
        return new Date(value);
      } catch (error) {
        return null;
      }
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      if (ast.kind === Kind.STRING) {
        return this.parseValue(ast.value);
      }

      return null;
    },
  }),
  Query: {
    hello: () => 'hello world!',
    users: async () => {
      const allUsers = await User.findAll();
      return allUsers.map((user) => {
        return {
          id: user.dataValues.id,
          username: user.dataValues.username,
          email: user.dataValues.email,
          password: user.dataValues.password,
        };
      });
    },
  },
  Mutation: {
    login: (parent, args, context, info) => {
      return args.userInfo.username;
    },
    addUser: () => ({
      errors: [
        {
          field: 'username',
          message: 'duplicate username',
        },
      ],
      user: {
        id: 1,
        username: 'test',
        email: 'test@test.com',
        password: 'password1234',
        freeText1: 'free text 1',
        freeText2: 'free text 2',
      },
    }),
    test: async (parent, args, context, info) => {
      const test = await User.findAll();
      return JSON.stringify(test);
    },
  },
};

// Apollo Server setup
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

// GraphQL listener
apolloServer.applyMiddleware({ app, cors: false });

// Epress listener
app.listen(
  process.env.PORT,
  console.log(`Server is in ${process.env.NODE_ENV} mode, ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`)
);
