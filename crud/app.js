var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
// var config = require('./config_prod')
var config = require('./config_dev')


var connection  = require('express-myconnection'); 
app.use(
    connection(mysql,{
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        port: config.database.port,
        database: config.database.db
    },'pool') //or single
);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


var index = require('./routes/index');
app.use('/', index);

var outils = require('./routes/outils');
app.use('/outils', outils);

var joueurs = require('./routes/joueurs');
app.use('/joueurs', joueurs);

var parties = require('./routes/parties');
app.use('/parties', parties);

var roles = require('./routes/roles');
app.use('/roles', roles);

var statuts = require('./routes/statuts');
app.use('/statuts', statuts);


var server = app.listen(config.server.port, config.server.host, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});