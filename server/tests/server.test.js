const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

// const mocha = require('mocha');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
    _id: new ObjectId(),
    text: "First test todo"
}, {
    _id: new ObjectId(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', ()=>{
    it('Should create a new todo', (done) => {
        var text =  'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=> done(e));
        });
    });

    it('Should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=> done(e));
        });
    })
});

describe('GET /todos', () => {
    it('should get all todos', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
})

describe('GET /todos/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    }
    )
    it('Should return 404 if todo not found', (done)=>{
        request(app)
            .get(`/todos/${(new ObjectId()).toHexString()}`)
            .expect(404)
            .end(done)
    });
    it('Should return 404 for non-object ids', (done)=>{
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done)
    });
});

describe('DELETE /todos/:id', () => {
    it('Should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.findOne({_id: hexId}).then((todo) => {
                expect(todo).toBeFalsy();
                done();
            }).catch((e) => done(e));
        });
    }
    )
    it('Should return 404 if todo not found', (done)=>{
        request(app)
            .delete(`/todos/${(new ObjectId()).toHexString()}`)
            .expect(404)
            .end(done)
    });
    it('Should return 404 if object id is invalid', (done)=>{
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done)
    });
})

describe('PATCH /todos:id', ()=>{
    it('Should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = "This is dummy text";

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: true,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe('number')
        })
        .end(done)
    });

    it('Should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = "This is dummy text";
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: false,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end(done)
    });
});