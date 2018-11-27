const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false,
    // }, (err, results) => {
    //     if (err) {
    //         return console.log('Uanble to insert todo', err)
    //     }

    //     console.log(JSON.stringify(results.ops, undefined, 2));
    // })

    // db.collection('Users').insertOne({
    //     name: 'Mark Hoekstra',
    //     age: 32,
    //     location: 'The Hague',
    // }, (err, results) => {
    //     if (err) {
    //         return console.log('Uanble to insert user', err)
    //     }

    //     console.log(JSON.stringify(results.ops, undefined, 2));
    // })

    client.close();
});
