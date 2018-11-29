const {ObjectId} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result)
// });

Todo.findByIdAndRemove('5bffcc4631a2013f0b2c796f').then((todo)=>{
    console.log(todo);
})