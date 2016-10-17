var router=require("express").Router();
var config=require("../config/config");
var log4js=require("../config/log.config.js");
var logger=log4js.getLogger('actions');
var query=config.query,
    encrypt=config.encrypt,
    decrypt=config.decrypt;

router.all('*',function(req,res,next){
    var ipAddress=req.connection.remoteAddress;
    var token=(req.body && req.body.token) || req.headers['access-token'];
    if(!token) return res.status(401).send();
    if(token=='guest') return next();
    try{
        var decoded=decrypt(token);
    }
    catch(err){
        logger.warn(ipAddress+' 身份认证失败');
        return res.json({
            code:-1,
            msg:"身份认证失败，请重新登录!"
        })
    }

    var userName=decoded.userName;
    var now=new Date().getTime();
    if(now-decoded.timestamp>12*3600*1000) { //token有效期12小时
        logger.warn(ipAddress+' 身份认证过期');
        return res.json({
            code:-1,
            msg:"身份认证已过期，请重新登录!"
        })
    }
    query("select * from users where username=?",[userName],function(err,data){
        if(err){
            logger.error(ipAddress+' '+err.toString());
            return res.json({
                code:1,
                msg:err.toString()
            })
        }
        if(data[0]){
            var newtime=new Date().getTime();
            token=encrypt({userName:userName,timestamp:newtime});
            req.token=token;
            next();
        }
        else{
            logger.info(ipAddress+' 身份验证失败');
            return res.json({
                code:-1,
                msg:"身份认证失败，请重新登录!"
            })
        }
    });
})

module.exports=router;