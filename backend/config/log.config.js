var log4js=require("log4js");
log4js.configure({
    appenders:[
        {
            type:'dateFile',
            filename:'backend/log/access/access',  //记录访问日志
            pattern:'-yyyy-MM-dd.log',
            alwaysIncludePattern:true,
            category:'access'
        },
        {
            type:'dateFile',
            filename:'backend/log/actions/actions', //记录操作日志,
            pattern:'-yyyy-MM-dd.log',
            alwaysIncludePattern:true,
            category:'actions'
        }
    ]
});

module.exports=log4js;