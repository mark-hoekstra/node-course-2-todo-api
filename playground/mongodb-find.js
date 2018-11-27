const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')

    // db.collection('Todos').find({
    //         _id:new ObjectID('5bfcfea231a2013f0b2c3420')
    //     }).toArray().then((docs) => {
    //     console.log('Todos:');
    //     console.log('----------');
    //     console.log(JSON.stringify(docs,undefined, 2));
    // }, (err) => {
    //     console.log('Unable to find the document:', err)
    // })

    db.collection('Users').find({name: 'Mark Hoekstra'}).count().then((count) => {
    console.log('User with name "Mark Hoekstra":');
    console.log(count);
}, (err) => {
    console.log('Unable to find the document:', err)
})

    client.close();
});