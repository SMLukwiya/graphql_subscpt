export default {
    me: () => ({
      id: '1',
      name: 'SMLukwiya',
      email: 'sunday@gmail.com',
      age: 28
    }),
    post: () => ({
      id: '1234sfsdfdf',
      title: 'Post One',
      body: 'This is the body of the post',
      published: true,
      author: '1'
    }),
    users: (parent, args, {db}, info) => {
      if (!args.query) {
        return db.dummyUsers
      }
      return db.dummyUsers.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
    },
    posts: (parent, args, {db}, info) => !args.query ?
      db.dummyPosts :
      db.dummyPosts.filter(
        post => post.title.toLowerCase().includes(args.query.toLowerCase) || post.body.toLowerCase().includes(args.query.toLowerCase())
      )
    ,
    comments: (parent, args, {db}, info) => db.dummyComments
}
