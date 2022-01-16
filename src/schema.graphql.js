import { gql } from 'apollo-server-express';

module.exports = gql`
   type Query {
    users(query: String): [User]!
    me: User!
    post: Post!
    posts(query: String): [Post]!
    comment: Comment!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: String!) : User!
    updateUser(id: ID!, data: UpdateUserInput): User!

    createPost(data: CreatePostInput) : Post!
    deletePost(id: String!): Post!
    updatePost(id: ID!, data: UpdatePostInput): Post!

    createComment(data: CreateCommentInput): Comment!
    deleteComment(id: String!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput): Comment!
  }

  type Subscription {
    count: Int!
    comment(postId: ID!): Comment!
  }


  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: String!
  }

  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
  }

  input CreateCommentInput {
    text: String!
    author: String!
    post: String!
  }

  input UpdateCommentInput {
    text: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`
