export const goLogin=({commit},info)=>{
    commit('LOGIN',info)
}

export const goRegister=({commit},info)=>{
    commit('REGISTER',info);
}

export const logOut=({commit})=>{
    commit('LOGOUT');
}

export const updateTitle=({commit},e)=>{
    commit('UPDATETITLE',e.target.value);
}

export const updateContent=({commit},e)=>{
    commit('UPDATECONTENT',e.target.value);
}

export const initList=({commit})=>{
    commit('INITLIST');
}

export const addItem=({commit})=>{
    commit('ADDITEM');
}

export const deleteItem=({commit},index)=>{
    commit('DELETEITEM',index);
}

export const completeItem=({commit},index)=>{
    commit('COMPLETEITEM',index);
}

export const changeFilter=({commit},type)=>{
    commit('CHANGEFILTER',type);
}

export const goSearch=({commit},keywords)=>{
    commit('GOSEARCH',keywords);
}