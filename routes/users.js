var express = require('express');
var User = require('../models').User;
var router = express.Router();

var checkIDInput = function (req, res, next) {
    if(isNaN(req.params.id)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkIDExist = function (req, res, next) {
    User.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('User not found');
        }
    });
};
router.get('/', function(req, res){
    User.findAll().then(user => {
      res.render('index',{
        usersArray: user,
        title: ('List All Users'),
      });
      // res.status(200).json(user);
    });
});
router.get('/list', function(req, res){
    User.findAll().then(user => {
      res.render('list',{
        usersArray: user,
        title: ('List All Users'),
      });
      // res.status(200).json(user);
    });
});
router.get('/search', function(req, res){
    User.findAll().then(user => {
      res.render('search',{
        usersArray: user,
        title: ('List All Users'),
      });
      // res.status(200).json(user);
    });
});
router.get('/search/:name', function(req, res, next) {
    var name = req.params.name;
    User.findAll({name: name}, function (err, users) {
        if(err) {
            return res.render('search', {users: null});
        }else{
          console.log(users);
        res.render('search', {usersArray: users});
        }
    });
});
router.post('/add', function(req, res){
    User.create({
        name: req.body.name,
        email: req.body.email,
    }).then(user => {
      // res.status(200).json(user);
        res.redirect('/list');
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

module.exports = router;
