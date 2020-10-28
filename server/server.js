const express = require('express');
const dotenv = require('dotenv');
// const { Sequelize, DataTypes } = require('sequelize');
const { ApolloServer, gql } = require('apollo-server-express');
// const { GraphQLScalarType } = require('graphql');
// const { Kind } = require('graphql/language');
const { User, Application } = require('./sequelize.js');

// Express set up
const app = express();

// Setting up environment variables
dotenv.config();

// SEQUELIZE TESTS
// User.findAll().then((res) => res.forEach((user) => console.log(user.dataValues.id)));

// graphQL typeDefs
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Date and Timestamp types
  # scalar DateType
  # scalar TimestampType

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
    user: User
  }

  # Application type
  type Application {
    id: ID
    user_id: String
    company: String!
    position: String
    url: String
    created_at: String
    recent_activity: String
    status: Status
    notes: String
  }

  # Input types for reusable inputs
  input UserInfo {
    username: String!
    password: String!
    email: String
  }

  input NewAppInfo {
    user_id: ID
    company: String!
    position: String
    url: String
    status: Status
    notes: String
  }

  input EditedAppInfo {
    id: ID
    position: String
    url: String
    status: Status
    notes: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "applications" query returns an array of zero or more applications (defined above).
  type Query {
    hello: String
    getAllUsers: [User]
    getUserApplications(userId: ID): [Application]
  }

  type Mutation {
    addUser(userInfo: UserInfo!): User
    addApplication(newAppInfo: NewAppInfo!): Application
    editApplication(editedAppInfo: EditedAppInfo!): Application
    login(userInfo: UserInfo!): String
    test: User
  }
`;

// graphQL resolvers
const resolvers = {
  // DateType: new GraphQLScalarType({
  //   name: 'Date',
  //   description: 'Date custom scalar type',
  //   parseValue(value) {
  //     return new Date(value); // value from the client
  //   },
  //   serialize(value) {
  //     return value.getTime(); // value sent to the client
  //   },
  //   parseLiteral(ast) {
  //     if (ast.kind === Kind.INT) {
  //       return parseInt(ast.value, 10); // ast value is always in string format
  //     }
  //     return null;
  //   },
  // }),
  // TimestampType: new GraphQLScalarType({
  //   name: 'Timestamp',
  //   serialize(date) {
  //     return date instanceof Date ? date.getTime() : null;
  //   },
  //   parseValue(date) {
  //     try {
  //       return new Date(value);
  //     } catch (error) {
  //       return null;
  //     }
  //   },
  //   parseLiteral(ast) {
  //     if (ast.kind === Kind.INT) {
  //       return new Date(parseInt(ast.value, 10));
  //     }
  //     if (ast.kind === Kind.STRING) {
  //       return this.parseValue(ast.value);
  //     }

  //     return null;
  //   },
  // }),
  Status: {
    PLANNED: 'planned',
    APPLIED: 'applied',
    REJECTED: 'rejected',
    INTERVIEW_SCHEDULED: 'interview scheduled',
    OFFERED: 'offered',
  },
  Application: {
    notes: (parent, args) => {
      console.log('Application parent ->', parent);
    },
  },
  Query: {
    hello: () => 'hello world!',
    getAllUsers: async () => {
      const allUsers = await User.findAll();
      return allUsers.map((user) => ({
        id: user.dataValues.id,
        username: user.dataValues.username,
        email: user.dataValues.email,
        password: user.dataValues.password,
      }));
    },
    getUserApplications: async (parent, { userId }) => {
      const userApps = await Application.findAll({
        where: {
          user_id: userId,
        },
      });
      return userApps.map((application) => ({
        id: application.dataValues.id,
        user_id: application.dataValues.user_id,
        company: application.dataValues.company,
        position: application.dataValues.position,
        url: application.dataValues.url,
        created_at: application.dataValues.created_at,
        recent_activity: application.dataValues.recent_activity,
        status: application.dataValues.status,
        notes: application.dataValues.notes,
      }));
    },
  },
  Mutation: {
    login: (parent, args, context, info) => {
      return args.userInfo.username;
    },
    addUser: async (parent, { userInfo }) => {
      const { username, password, email } = userInfo;
      const newUser = await User.create({ username, password, email });
      return newUser;
    },
    addApplication: async (parent, { newAppInfo }) => {
      const { user_id, company, position, url, notes } = newAppInfo;
      const status = newAppInfo.status || 'PLANNED';
      const newApp = await Application.create({ user_id, company, position, url, status, notes });
      return newApp;
    },
    editApplication: async (parent, { editedAppInfo }) => {
      const { id, position, url, notes, status } = editedAppInfo;
      const recentActivity = new Date().toISOString();
      const editedApp = Application.update(
        { position, url, status, notes, recent_activity: recentActivity },
        {
          where: {
            id,
          },
        }
      );
      return editedApp;
    },
    test: async (parent, args, context, info) => {
      const newUser = await User.create({ username: 't', password: 't', email: 't' });
      return newUser;
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
