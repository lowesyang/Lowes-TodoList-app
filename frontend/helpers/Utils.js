import moment from "moment";

//深拷贝函数
export const DeepClone=(obj)=>{
    if(typeof(obj)==='object'){
        if(obj instanceof Array){
            let newArr=obj.slice();
            return newArr;
        }
        else {
            var newObj={};
            for(let key in obj){
                newObj[key]=DeepClone(obj[key]);
            }
            return newObj;
        }
    }
    else return obj;
};

// 拓展本地存储的数据类型，支持存储json对象
export const LS = {
    setItem(key,value){
        if(typeof value=="object") value=JSON.stringify(value);
        localStorage.setItem(key,value);
    },
    getItem(key){
        let temp=localStorage.getItem(key);
        let res;
        if(res=JSON.parse(temp)) return res;
        return temp;
    },
    removeItem(key){
        localStorage.removeItem(key);
    },
    clear(){
        localStorage.clear();
    }
};

// 时间修饰函数
// time为标准时间格式, now为今天的moment时间格式
export const DecorateTime=(time,now)=>{
    let finalTime,tempTime=moment(time);
    let newTime=tempTime.format('HH:mm');
    let day=tempTime.format('D');
    let year=tempTime.format('Y');
    if(now.format('D')==day) finalTime="今天 "+newTime;
    else if(now-day==1) finalTime="昨天 "+newTime;
    else if(now-day==2) finalTime="前天 "+newTime;
    else if(now.format('Y')==year) finalTime=tempTime.format('M')+"月"+day+"日";
    else finalTime=tempTime.format('Y')+"年 "+tempTime.format('M')+"月"+day+"日";

    return finalTime;
}