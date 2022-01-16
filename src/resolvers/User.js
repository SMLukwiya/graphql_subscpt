const User = {
  posts: (parent, args, {db}, info) => db.dummyPosts.filter(post => post.author === parent.id),
  comments: (parent, args, {db}, info) => db.dummyComments.filter(comment => comment.author === parent.id)
}

export default User;
