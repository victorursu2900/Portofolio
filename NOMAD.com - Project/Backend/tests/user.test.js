// Import necessary testing libraries
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../app'); // Ensure your Express app is modularized and can be imported

// Connect to a test database
mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Require your user model
const User = require('../models/userModel');

// User tests
describe('User API Integration Tests', function() {
    describe('POST /api/users/register', function() {
        it('should register a new user', function(done) {
            request(app)
                .post('/users/register')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    username: 'johndoe',
                    email: 'john@example.com',
                    password: '123456',
                    confirmPassword: '123456',
                    subscriptionType: '1-year'
                })
                .expect(201)
                .end(function(err, res) {
                    expect(res.body).to.have.property('message', 'User registered successfully');
                    expect(res.body).to.have.property('token');
                    done(err);
                });
        });
    });

    describe('POST /api/users/login', function() {
        it('should authenticate user and return a token', function(done) {
            request(app)
                .post('../userRoutes/login')
                .send({
                    username: 'johndoe',
                    password: '123456'
                })
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.have.property('token');
                    done(err);
                });
        });
    });

    describe('PUT /users/update', function() {
        let token; // Assume this token is set by a successful login or registration

        before(function(done) {
            request(app)
                .post('/users/login')
                .send({
                    username: 'johndoe',
                    password: '123456'
                })
                .end(function(err, res) {
                    token = res.body.token;
                    done(err);
                });
        });

        it('should update the user profile', function(done) {
            request(app)
                .put('/users/update')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    firstName: 'John',
                    lastName: 'Doe Updated',
                    email: 'john_updated@example.com'
                })
                .expect(200)
                .end(function(err, res) {
                    expect(res.body.firstName).to.equal('John');
                    expect(res.body.lastName).to.equal('Doe Updated');
                    expect(res.body.email).to.equal('john_updated@example.com');
                    done(err);
                });
        });
    });

    // Additional tests can include password reset, logout, delete profile, etc.
});

// After all tests are done, disconnect from the database
after(function(done) {
    mongoose.disconnect(done);
});
