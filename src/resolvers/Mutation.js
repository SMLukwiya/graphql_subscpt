import { v4 as uuidv4 } from 'uuid';

const mutation = {
  createUser: (parent, args, {db}, info) => {
    const emailTaken = db.dummyUsers.some(user => user.email === args.data.email)

    if (emailTaken) throw new Error('This email is already taken')

    const user = {
      id: uuidv4(),
      ...args.data
    }

    db.dummyUsers.push(user)
    return user;
  },
  deleteUser: (parents, args, {db, pubsub}, info) => {
    const userIndex = db.dummyUsers.findIndex(user => user.id === args.id);

    if (userIndex === -1) throw new Error('User not found')

    db.dummyPosts = db.dummyPosts.filter(post => {
      const match = post.author !== args.id;

      if (match) {
        db.dummyComments = db.dummyComments.filter(comment => comment.post !== post.id);
      }
    });
    db.dummyComments.filter(comment => comment.author !== args.id);

    const deletedUser = db.dummyUsers.splice(userIndex, 1);
    return deletedUser[0];
  },
  updateUser: (parent, args, {db}, info) => {
    const {id, data} = args;
    const user = db.dummyUsers.find(user => user.id === id);

    if (!user) throw new Error('User not found');

    if (typeof data.email === 'string') {
      const emailTaken = db.dummyUsers.some(user => user.email === data.email);

      if (emailTaken) throw new Error('Email already in use')
      user.email = data.email
    }

    if (typeof data.name === 'string') { user.name = data.name }

    if (typeof data.age !== 'undefined') { user.age = data.age }

    return user;
  },

  createPost: (parent, args, {db, pubsub}, info) => {
    const userExists = db.dummyUsers.some(user => user.id === args.data.author);

    if (!userExists) throw new Error('This user is not found')

    const post = {
      id: uuidv4(),
      ...args.data
    }

    db.dummyPosts.push(post);
    if (args.data.published) return pubsub.publish('post', {
      post: { mutation: 'CREATED', data: post }
    });
    return post;
  },
  deletePost: (parent, args, {db, pubsub}, info) => {
    const postIndex = db.dummyPosts.findIndex(post => post.id === args.id)

    if (postIndex === -1) throw new Error('Post not found')

    db.dummyComments = db.dummyComments.filter(comment => comment.post === args.id);
    const [post] = db.dummyPosts.splice(postIndex, 1);

    if (post.published) {
      pubsub.publish('post',{ post: { mutation: 'DELETED', data: post }})
    }

    return post;
  },
  updatePost: (parent, args, {db, pubsub}, info) => {
    const {id, data} = args;
    const post = db.dummyPosts.find(post => post.id === id);
    const originalPost = {...post}

    if (!post) throw new Error('Post not found');

    if (typeof data.title === 'string') { post.title = data.title }
    if (typeof data.body === 'string') { post.body = data.body }
    if (typeof data.published === 'bool') {
      post.published === data.published


      if (originalPost.published && !post.published) {
        // reference original post to ignore most recent post changes
          pubsub.publish('post', { post: { mutation: 'DELETED', data: originalPost }})
      } else if (!originalPost.published && post.published) {
          pubsub.publish('post', { post: { mutation: 'CREATED', data: post }})
      } else {
          pubsub.publish('post', { post: { mutation: 'UPDATED', data: post }})
      }

    }

    return post;
  },

  createComment: (parent, args, {db, pubsub}, info) => {
    const userExists = db.dummyUsers.some(user => user.id === args.data.author)
    const postExists = db.dummyPosts.some(post => post.id === args.data.post && post.published)

    if (!userExists ||!postExists ) throw new Error('User or/and Post not found')

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.dummyComments.push(comment);
    pubsub.publish(`comment-${args.data.post}`,{ comment: { mutation: 'CREATED', data: comment }})
    
    return comment;
  },
  deleteComment: (parent, args, {db, pubsub}, info) => {
    const commentIndex = db.dummyComments.findIndex(comment => comment.id === args.id);

    if (commentIndex === -1) throw new Error('Comment not found');

    const [deletedComment] = db.dummyComments.splice(commentIndex, 1)

    pubsub.publish(`comment-${deletedComment.post}`, { comment : { mutation: 'DELETED', data: deletedComment }})
    return deletedComment;
  },
  updateComment: (parent, args, {db, pubsub}, info) => {
    const {id, data} = args;
    const comment = db.dummyComments.find(comment => comment.id === id)

    if (!comment) throw new Error('No comment found');

    if (typeof data.text === 'string') { comment.text = data.text }

    pubsub.publish(`comment-${comment.post}`, { comment: { mutation: 'UPDATED', data: comment }})

    return comment;
  }
}

export default mutation;
