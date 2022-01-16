import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const Subscription = {
  count: {
    subscribe: (parent, args, ctx, info) => {
      let count = 0;

      setInterval(() => {
        count++
        pubsub.publish('count', {
          count
        })
      }, 1000)

      return  pubsub.asyncIterator(['count'])}
  }
}

export default Subscription;
