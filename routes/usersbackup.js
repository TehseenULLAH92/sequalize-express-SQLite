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
router.post('/add', function(req, res){
    User.create({
        name: req.body.name,
        email: req.body.email,
    }).then(user => {
      // res.status(200).json(user);
        res.redirect('/users');
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});
router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    User.findById(req.params.id).then(user => {
        res.status(200).json(user);
    });
});
router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    User.update({
      name: req.body.name,
      email: req.body.email,
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});
router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    User.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});
module.exports = router;
