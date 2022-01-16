import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';

import typeDefs from './schema.graphql';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import Subscription from './resolvers/Subscription';


// Resolver
const resolvers = {
  Query,
  Post,
  User,
  Comment,
  Mutation,
  Subscription
};

(async () => {
  const app = express();

  const httpServer = createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create({
    schema, execute, subscribe, onConnect(connectionParams, webSocket, context) {
    console.log('Connected!')
  },
  }, {
    server: httpServer,
    path: '/graphql'
  })

  const server = new ApolloServer({
    schema,
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() { subscriptionServer.close()}
        }
      }
    }],
    context: {
      db
    }});

    await server.start();
    // console.log(server)
    server.applyMiddleware({app});

    httpServer.listen(4000, () => {
        console.log(`Server listening on port 4000 at http://localhost:4000${server.graphqlPath}`);
        console.log(`Subscriptions listening at ws://localhost:4000${server.graphqlPath}`)
    }
    );
})()
