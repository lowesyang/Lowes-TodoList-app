export const goLogin=({dispatch},usrName,psWord)=>{
    dispatch('LOGIN',usrName,psWord)
}

export const goRegister=({dispatch},usrName,psWord,cfpsWord)=>{
    dispatch('REGISTER',usrName,psWord,cfpsWord);
}

export const logOut=({dispatch})=>{
    dispatch('LOGOUT');
}