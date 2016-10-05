var express=require("express");
var app=express();
var bodyParser=require('body-parser');
var expSession=require("express-session");
var compress=require("compression");
var login=require("./backend/router/login");
var login_check=require("./backend/router/login_check");
var todoActions=require("./backend/router/todoActions");
var log4js=require("./backend/config/log.config.js");


app.use(express.static('./'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(expSession({
    secret:'LowesYang',
    key:'123456',
    resave:false,
    saveUninitialized:true
}));

app.use(compress());

app.use(log4js.connectLogger(log4js.getLogger('access'),{level:log4js.levels.INFO}));
app.use('/',login_check);
app.use('/user',login);
app.use('/list',todoActions);

app.listen('2333');
