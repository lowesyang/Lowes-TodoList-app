import moment from "moment";

// time为标准时间格式, now为今天的moment时间格式
export default function(time,now){
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