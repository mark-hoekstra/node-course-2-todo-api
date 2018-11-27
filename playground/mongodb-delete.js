const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')

    //deleteMany
    db.collection('Users').deleteMany({name: 'Mark Hoekstra'}).then((result)=> {
        console.log(`Deleted all entries with Mark Hoekstra`)
    }, (err)=> {
        console.log('Something went wrong deleting doc')
    });
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=> {
    //     console.log(result)
    // }, (err)=> {
    //     console.log('Something went wrong deleting doc')
    // });
    //findOneAndDelete
    db.collection('Users').findOneAndDelete({_id:new ObjectId('5bfcfc44841dcf01efc2952a')}).then((result)=> {
        console.log(`Deleted the entry with the unique ID`)
    }, (err)=> {
        console.log('Something went wrong deleting doc')
    });

    //client.close();
});