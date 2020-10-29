const express = require('express');
const dotenv = require('dotenv');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./typeDefs.js');
const { resolvers } = require('./resolvers.js');

// Express set up
const app = express();

// Setting up environment variables
dotenv.config();

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
