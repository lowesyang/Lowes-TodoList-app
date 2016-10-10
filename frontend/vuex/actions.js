export const goLogin=({commit},info)=>{
    commit('login',info)
}

export const goRegister=({commit},info)=>{
    commit('register',info);
}

export const logOut=({commit})=>{
    commit('logout');
    commit('clearList');
}

export const updateTitle=({commit},e)=>{
    commit('updateTitle',e.target.value);
}

export const updateContent=({commit},e)=>{
    commit('updateContent',e.target.value);
}

export const initList=({commit})=>{
    commit('initList');
}

export const addItem=({commit})=>{
    commit('addItem');
}

export const deleteItem=({commit},index)=>{
    commit('deleteItem',index);
}

export const completeItem=({commit},index)=>{
    commit('completeItem',index);
}

export const changeFilter=({commit},type)=>{
    commit('changeFilter',type);
}

export const goSearch=({commit},keywords)=>{
    commit('goSearch',keywords);
}

export const addTag=({commit},itemId)=>{
    commit('addTag',itemId)
}

export const updateTag=({commit},e)=>{
    commit('updateTag',e.target.value);
}