
import apollo from 'apollo-server-express';
const { gql } = apollo

console.log("gql!!",gql);

// graphQL typeDefs
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Enum type for status
  enum Status {
    PLANNED
    APPLIED
    REJECTED
    INTERVIEW_SCHEDULED
    OFFERED
  }

  # User type
  type User {
    id: ID
    social_id: String
    username: String
    email: String
    password: String
  }

  type AddUserResponse {
    errors: [String]!
    user: User
  }

  type LoginResponse {
    errors: [String]!
    user: User
  }

  type AuthPayload {
    user: User
  }

  # Application type
  type Application {
    id: ID!
    user_id: String
    company: String!
    position: String
    url: String
    created_at: String!
    recent_activity: String!
    status: Status!
    notes: String
    archive: Boolean!
  }

  # Input types for reusable inputs
  input LoginInfo {
    username: String!
    password: String!
  }

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
    id: ID!
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
    getCurrentUser: User
    getAllUsers: [User]
    getUserApplications(userId: ID!): [Application]
    getApplicationData(applicationId: ID!): Application
  }

  type Mutation {
    addUser(userInfo: UserInfo!): AddUserResponse
    addApplication(newAppInfo: NewAppInfo!): Application
    editApplication(editedAppInfo: EditedAppInfo!): Application
    archiveApplication(id: ID!): Application
    #login(loginInfo: LoginInfo!): LoginResponse
    login(email: String!, password: String!): AuthPayload
    test: User
  }
`;

export { typeDefs }
