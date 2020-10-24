// import express from 'express';
// import dotenv from 'dotenv';
// import { ApolloServer, gql } from 'apollo-server';
// import { GraphQLScalarType } from 'graphql';
// import { Kind } from 'graphql/language';
const express = require('express');
const dotenv = require('dotenv');
const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

// Express set up
const app = express();

// Setting up environment variables
dotenv.config();

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

  # This "Application" type defines the queryable fields for every application in our data source.
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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "applications" query returns an array of zero or more applications (defined above).
  type Query {
    hello: String
    applications: [Application]
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
      return (date instanceof Date) ? date.getTime() : null
    },
    parseValue(date) {
      try { return new Date(value); }
      catch (error) { return null; }
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      else if (ast.kind === Kind.STRING) {
        return this.parseValue(ast.value);
      }
      else {
        return null;
      }
    },
  }),
  Query: {
    hello: () => "hello world!"
  }
}

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// GraphQL listener
server.listen().then(({ url }) => console.log(`Server started at ${url}`));

// Epress listener
app.listen(process.env.PORT, console.log(`Server is in ${process.env.NODE_ENV} mode, listening on port ${process.env.PORT}`));