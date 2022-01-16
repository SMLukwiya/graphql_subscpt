import { PubSub } from 'graphql-subscriptions';

const Subscription = {
  comment: {
    subscribe: (parent, {postId}, {db, pubsub}, info) => {
      const post = db.dummyPosts.find(post => post.id === postId);

      if (!post) throw new Error('Post not found')

      return pubsub.asyncIterator([`comment-${postId}`])
    }
  },
  post: {
    subscribe: (parent, args, { db, pubsub }, info) => pubsub.asyncIterator(['post'])
  }
}

export default Subscription;
