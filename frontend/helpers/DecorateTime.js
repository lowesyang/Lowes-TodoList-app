import moment from "moment";

// time为标准时间格式, now为今天的日期
export default function(time,now){
    let finalTime;
    let newTime=moment(time).format('HH:mm');
    let day=moment(time).format('D');
    if(now==day) finalTime="今天 "+newTime;
    else if(now-day==1) finalTime="昨天 "+newTime;
    else if(now-day==2) finalTime="前天 "+newTime;
    else finalTime=moment(time).format('YYYY-MM-DD HH:mm');

    return finalTime;
}