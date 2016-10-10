//loading加载图标显示
export const isLoaded=state=>{
    if(state.User.isLogin) return state.Todos.isLoaded;
    else return state.User.isLoaded;
}

//是否登录
export const isLogin=state=>state.User.isLogin;

//欲添加的标题
export const addTitle=state=>state.Todos.addItem.title;

//欲添加的内容
export const addContent=state=>state.Todos.addItem.content;

//欲添加的标签
export const addTag=state=>state.Todos.addTag;

//列表过滤器
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

//无内容的反馈
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

//列表loading图标显示
export const listLoaded=state=>state.Todos.listLoaded;