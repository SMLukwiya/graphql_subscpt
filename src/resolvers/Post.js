const Post = {
  author: (parent, args, {db}, info) => db.dummyUsers.find(user => user.id === parent.author),
  comments: (parent, args, {db}, info) => db.dummyComments.filter(comment => comment.post === parent.id)
}

export default Post;
