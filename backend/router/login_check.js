var router=require("express").Router();
var config=require("../config/config");

var query=config.query,
    decrypt=config.decrypt;

router.all('*',function(req,res,next){
    var token=(req.body && req.body.token) || req.headers['access-token'];
    if(!token) return res.status(401).send();
    if(token=='guest') return next();
    try{
        var decoded=decrypt(token);
    }
    catch(err){
        return res.json({
            code:-1,
            msg:"身份认证失败，请重新登录!"
        })
    }

    var userName=decoded.userName;
    query("select * from users where userName=?",[userName],function(err,data){
        if(err){
            return res.json({
                code:1,
                msg:err.toString()
            })
        }
        if(data[0]){
            req.token=token;
            next();
        }
        else{
            return res.json({
                code:-1,
                msg:"身份认证失败，请重新登录!"
            })
        }
    });
})

module.exports=router;