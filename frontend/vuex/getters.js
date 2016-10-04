export const isLoaded=state=>{
    if(state.User.isLogin) return state.Todos.isLoaded;
    else return state.User.isLoaded;
}   //登录注册loading

export const isLogin=state=>state.User.isLogin;

export const addTitle=state=>state.Todos.addItem.title;

export const addContent=state=>state.Todos.addItem.content;

export const addTag=state=>state.Todos.addTag;

export const listFilter=state=>{
    let list=[];
    state=state.Todos;
    switch(state.filter){
        case "SHOW_ALL":
            list = state.list;
            break;
        case "NOT_COMPLETED":
            list=state.list.filter(item=>!item.completed);
            break;
        case "COMPLETED":
            list=state.list.filter(item=>item.completed);
            break;
        default:list=state.list;break;
    }
    return list;
}

export const getNoResForList=state=>{
    let noRes;
    switch(state.Todos.filter){
        case 'SHOW_ALL':
            noRes="您还没有任何事项，赶快添加吧~";break;
        case 'NOT_COMPLETED':
            noRes="您还没有待做事项，赶快添加吧~";break;
        case 'COMPLETED':
            noRes="您还没有完成的事项~";break;
    }
    return noRes;
}

export const listLoaded=state=>state.Todos.listLoaded;