var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite = require('sqlite3');
var env = require('dotenv').load();
var port = process.env.PORT || 3000;
const path = require('path');
var models = require("./models");
var users = require('./routes/users');

models.sequelize.sync().then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/users', users);
app.use('/list', users);
app.use('/search', users);
app.get('/', function(req, res){
    console.log('app listening on port: '+port);
});
app.listen(port, function(){
    console.log('app listening on port: '+port);
});
module.exports = app;
