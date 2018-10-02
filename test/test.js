Uservar chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var User = require('../models').User;

chai.use(chaiHttp);

describe('User API', function(){
    //Before each test we empty the database
    beforeEach(function(done){
        User.destroy({
            where: {},
            truncate: true
        });
        done();
    });
    describe('/GET Users', function(){
        it('Getting all Users', function(done){
            chai.request(app).get('/users').end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    describe('/POST users', function(){
        it('Insert new User', function(done){
            var user = {
                name: 'Jack Ma',
                email: 'jackma@local.com'
            }
            chai.request(app).post('/users').send(user).end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });
    describe('/GET/:id users', function(){
        it('Get user by id', function(done){
            User.create({
                title: 'Jack Ma',
                email: 'jackma@local.com'
            }).then(function(user){
                chai.request(app).get('/users/'+user.id).end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
        it('Get user by not existed id', function(done){
            chai.request(app).get('/users/100').end(function(err, res){
                res.should.have.status(400);
                res.body.should.equal('user not found');
                done();
            })
        });
        it('Get user by invalid id', function(done){
            chai.request(app).get('/users/abc').end(function(err, res){
                res.should.have.status(400);
                res.body.should.equal('Invalid ID supplied');
                done();
            });
        });
    });
    describe('/PUT/:id users', function(){
        it('Update user by id', function(done){
            User.create({
                title: 'Jack Ma',
                email: 'jackma@local.com'
            }).then(function(user){
                var userEdit = {
                    title: 'Amor Fati',
                    email: 'jackma@test.com'
                }
                chai.request(app).put('/users/'+user.id).send(userEdit).end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            })
        });
    });
    describe('/DELETE/:id users', function(){
        it('Delete user by id', function(done){
            User.create({
                title: 'Jack Ma',
                email: 'jackma@local.com'
            }).then(function(user){
                chai.request(app).delete('/users/'+user.id).end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.equal(1);
                    done();
                });
            })
        });
    });
});
