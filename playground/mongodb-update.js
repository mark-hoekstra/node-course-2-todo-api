const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')

    //findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectId("5bfcfea231a2013f0b2c3420")
    // }, {
    //     $set: {
    //         completed: true}}, {
    //             returnOriginal: false
    //         }
    //         ).then((results) => {
    //             console.log(results);
    //         }, (err) => {
    //             console.log(err);
    //         });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId("5bfd207031a2013f0b2c389f")
    }, {
        $set: {
            name: "John"},
        $inc: {
            age: 1}
        }, {
                returnOriginal: false
            }
            ).then((results) => {
                console.log(results);
            }, (err) => {
                console.log(err);
            });

    //client.close();
});