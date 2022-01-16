const dummyUsers = [
  {
    id: '1',
    name: 'SMLukwiya',
    email: 'sunday@gmail.com',
    age: 28
  },
  {
    id: '2',
    name: 'SMLukwiya1',
    email: 'sunday@gmail1.com',
    age: 28
  },
  {
    id: '3',
    name: 'SMLukwiya2',
    email: 'sunday@gmail2.com',
  }
]

const dummyPosts = [
  {
    id: '1',
    title: 'Post One',
    body: 'This is the body of the post one',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Post Two',
    body: 'This is the body of the post two',
    published: false,
    author: '2'
  },
  {
    id: '3',
    title: 'Post Three',
    body: 'This is the body of the post three',
    published: true,
    author: '1'
  }
]

const dummyComments = [
  { id: '1', text: 'This is first comment', author: '1', post: '1'},
  { id: '2', text: 'This is good', author: '2', post: '2'},
  {id: '3', text: 'This is a good followup', author: '3', post: '3'},
  {id: '4', text: 'I came late to the party', author: '1', post: '1'}
]

const db = { dummyPosts, dummyUsers, dummyComments }

export default db;
