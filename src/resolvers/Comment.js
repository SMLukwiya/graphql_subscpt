const Comment = {
  author: (parent, args, {db}, info) => db.dummyUsers.find(user => user.id === parent.author),
  post: (parent, args, {db}, info) => db.dummyPosts.find(post => post.id === parent.post)
}

export default Comment;
