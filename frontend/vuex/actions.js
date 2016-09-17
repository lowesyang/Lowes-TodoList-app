export const goLogin=({dispatch},usrName,psWord)=>{
    dispatch('LOGIN',usrName,psWord)
}

export const goRegister=({dispatch},usrName,psWord,cfpsWord)=>{
    dispatch('REGISTER',usrName,psWord,cfpsWord);
}

export const initList=({dispatch})=>{
    dispatch('INITLIST');
}

export const listFilter=(state)=>{
    let list=[];
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

export const addItem=({dispatch},title,content)=>{
    let item={
        title,
        content
    }
    dispatch('ADDITEM',item);
}

export const deleteItem=({dispatch},index)=>{
    dispatch('DELETEITEM',index);
}

export const completeItem=({dispatch},index)=>{
    dispatch('COMPLETEITEM',index);
}

export const changeFilter=({dispatch},type)=>{
    dispatch('CHANGEFILTER',type);
}

export const getNoResForList=(state)=>{
    let noRes;
    switch(state.filter){
        case 'SHOW_ALL':
            noRes="您还没有任何事项，赶快添加吧~";break;
        case 'NOT_COMPLETED':
            noRes="您还没有待做事项，赶快添加吧~";break;
        case 'COMPLETED':
            noRes="您还没有完成的事项~";break;
    }
    return noRes;
}

export const goSearch=({dispatch},keywords)=>{
    dispatch('GOSEARCH',keywords);
}