var router=require("express").Router();
var config=require("../config/config");
var log4js=require("../config/log.config.js");
var logger=log4js.getLogger('actions');
var query=config.query,
    encrypt=config.encrypt;

router.post('/login',function(req,res){
    var ipAddress=req.connection.remoteAddress;
    var users={
        usrName:req.body.userName,
        psWord:encrypt(req.body.passWord)
    };
    if(users.usrName=="") {
        return res.json({
            code: 1,
            msg: "用户名不得为空!"
        });
    }
    if(users.psWord=="") {
        return res.json({
            code: 1,
            msg: "密码不得为空!"
        });
    }

    query('select * from users where username=? and password=?', [users.usrName,users.psWord], function(err,data){
            if(err) {
                logger.error(ipAddress+' '+err.toString());
                return res.json({
                    code: 1,
                    msg: err.toString()
                });
            }


            if(data[0]){
                var timestamp=new Date().getTime();
                var token=encrypt({userName:users.usrName,timestamp:timestamp});
                logger.info(ipAddress+' 登陆成功');
                res.json({
                    code:0,
                    msg:"登录成功!",
                    token:token,
                    userId:data[0].id
                })
            }
            else{
                logger.info(ipAddress+' 用户名或密码错误');
                res.json({
                    code:1,
                    msg:"用户名或密码错误!"
                })
            }
    })
})

router.post('/register',function(req,res){
    var ipAddress=req.connection.remoteAddress;
    var users={
        usrName:req.body.userName,
        psWord:req.body.passWord,
        cfpsWord:req.body.cfpsWord
    }

    if(users.usrName=="") {
        return res.json({
            code: 1,
            msg: "用户名不得为空!"
        });
    }
    if(users.psWord=="") {
        return res.json({
            code: 1,
            msg: "密码不得为空!"
        });
    }
    if(users.psWord!=users.cfpsWord) {
        return res.json({
            code: 1,
            msg: "两次密码输入不一致!"
        })
    }

    query('select * from users where userName=?',[users.usrName],function(err,data){
        if(err) {
            logger.error(ipAddress+' '+err.toString());
            return res.json({
                code: 1,
                msg: err.toString()
            });
        }

        if(data[0]) {
            return res.json({
                code: 1,
                msg: "该用户名已存在!"
            });
        }
        else {
            query('insert into users (userName,password) values (?,?)',[users.usrName,encrypt(users.psWord)],function(qerr,ddata){
                if(qerr){
                    logger.error(ipAddress+' '+qerr.toString());
                    res.json({
                        code:1,
                        msg:qerr.toString()
                    })
                }
                if(ddata){
                    var timestamp=new Date().getTime();
                    var token=encrypt({userName:users.usrName,timestamp:timestamp});
                    logger.info(ipAddress+' 注册成功');
                    res.json({
                        code:0,
                        token:token,
                        msg:"注册成功!",
                        userId:ddata.insertId
                    })
                }
                else{
                    logger.info(ipAddress+' 注册失败,数据库操作错误');
                    return res.json({
                        code:1,
                        msg:"注册失败,发生未知错误!"
                    })
                }
            })
        }
    })
});

module.exports=router;