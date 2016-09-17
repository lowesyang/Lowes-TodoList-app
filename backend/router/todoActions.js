var router=require("express").Router();
var config=require("../config/config");
var moment=require("moment");
var query=config.query;

router.get('/:userId',function(req,res){
    var userId=req.params.userId;
    query('select * from todoList where userId=? and deleted=0',[userId],function(err,data){
        if(err){
            return res.json({
                code:1,
                msg:err.toString()
            })
        }
        if(data){
            var list=data.map(function(item,key){
                return {
                    id:item.id,
                    title:item.title,
                    content:item.content,
                    completed:item.completed,
                    deleted:item.deleted,
                    time:item.addTime
                }
            });
            res.json({
                code:0,
                list:list
            })
        }
        else{
            res.json({
                code:1,
                msg:"获取待做事项列表失败!"
            })
        }
    })
})

router.post('/addItem',function(req,res){
    var info={
        title:req.body.title,
        content:req.body.content,
        userId:req.body.userId
    }
    if(!info.title) {
        return res.json({
            code:1,
            msg:"事项标题不能为空!"
        })
    }
    var now_datetime=moment().format('YYYY-MM-DD HH:mm:ss');
    query('insert into todoList (title,content,completed,deleted,userId,addTime) values (?,?,0,0,?,?)',
        [info.title,info.content,info.userId,now_datetime],function(err,data){
        if(err){
            return res.json({
                code:1,
                msg:err.toString()
            })
        }

        if(data){
            return res.json({
                code:0,
                msg:"添加事项成功!",
                newId:data.insertId,
                addTime:now_datetime
            })
        }
        else{
            return res.json({
                code:1,
                msg:"添加事项失败!"
            })
        }
    })
})

router.put('/deleteItem',function(req,res){
    var info={
        itemId:req.body.itemId,
        userId:req.body.userId
    };
    query('update todoList set deleted=1 where id=? and userId=?',[info.itemId,info.userId],function(err,data){
        if(err){
            return res.json({
                code:1,
                msg:err.toString()
            })
        }
        if(data){
            res.json({
                code:0,
                msg:'事项删除成功!'
            })
        }
        else{
            res.json({
                code:1,
                msg:'事项删除失败!'
            })
        }
    })
})

router.put('/completeItem',function(req,res){
    var info={
        itemId:req.body.itemId,
        userId:req.body.userId
    };
    query('update todoList set completed=1 where id=? and userId=?',[info.itemId,info.userId],function(err,data){
        if(err){
            return res.json({
                code:1,
                msg:err.toString()
            })
        }
        if(data){
            res.json({
                code:0,
                msg:'完成事项成功!'
            })
        }
        else{
            res.json({
                code:1,
                msg:'完成事项失败!'
            })
        }
    })
})

module.exports=router;