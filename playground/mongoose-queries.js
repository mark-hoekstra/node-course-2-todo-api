const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

var id = '5bfd375fe9c3dc03785b0e30';

// Todo.find({
//     _id: id,
// }).then((todos) => {
//     console.log('Todos', todos)
// });

// Todo.findOne({
//     _id: id,
// }).then((todo) => {
//     console.log('Todo', todo)
// });

// Todo.findById(id)
// .then((todo) => {
//     console.log('Todo by id', todo)
// })

// User.findById(id)
// .then((user) => {
//     console.log('User by id', user)
// })