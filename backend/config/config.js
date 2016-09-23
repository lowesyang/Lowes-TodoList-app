var mysql=require("mysql");
var pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'todo_list'
})

var query=function(sql,data,callback){
    pool.getConnection(function(err,conn){
        if(err) callback(err,null,null);
        else{
            conn.query(sql,data,function(qerr,response){
                conn.release();
                callback(qerr,response);
            })
        }
    })
};

var crypto=require("crypto");
var key="LowesYang";
function encrypt_token(obj){
    var plainText=JSON.stringify(obj);
    var encrypted="";
    var cipher=crypto.createCipher("aes192",key);
    encrypted+=cipher.update(plainText,'utf8','hex');
    encrypted+=cipher.final('hex');
    return encrypted;
}
function decrypt_token(str){
    var decrypted="";
    var decipher=crypto.createDecipher("aes192",key);
    decrypted+=decipher.update(str,'hex','binary');
    decrypted+=decipher.final('binary');
    return JSON.parse(decrypted);
}

module.exports={
    query:query,
    encrypt:encrypt_token,
    decrypt:decrypt_token
}