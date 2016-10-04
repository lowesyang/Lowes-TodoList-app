import Vue from "vue/dist/vue.min";
import LS from "../../helpers/LocalStorage";
import router from "../../index";

let userInfo=LS.getItem("userInfo");

const state={
    isLoaded:true,
    isLogin:userInfo && userInfo.token
}

const mutations= {
    LOGIN(state, info){
        let userName=info.usrName;
        let passWord=info.psWord;
        if (!userName) return Materialize.toast("用户名不得为空!", 3000);
        if (!passWord) return Materialize.toast("密码不得为空!", 3000);
        state.isLoaded = false;
        Vue.http.post('/user/login',
            {
                token: 'guest',
                userName: userName,
                passWord: passWord
            }).then((response)=> {
            let res = response.body;
            if (!res.code) {
                let userInfo = {
                    token: res.token,
                    userName: userName,
                    userId: res.userId
                };
                LS.setItem('userInfo', userInfo);
                Vue.http.headers.common['access-token'] = userInfo.token;
                Materialize.toast(res.msg, 1000);
                state.isLogin = true;
                router.push({path: '/list/' + userInfo.userId})
            }
            else Materialize.toast(res.msg, 3000);
        }, (response)=> {
            Materialize.toast("登录失败,请检查网络配置!", 3000);
        }).then(()=> {
            state.isLoaded = true;
        })
    },
    REGISTER(state, info){
        let userName=info.usrName;
        let passWord=info.passWord;
        let cfPassWord=info.cfpsWord;
        if (!userName) return Materialize.toast("用户名不得为空!", 3000);
        if (!passWord) return Materialize.toast("密码不得为空!", 3000);
        if (passWord != cfPassWord) return Materialize.toast("两次密码输入不一致!", 3000);
        state.isLoaded = false;
        Vue.http.post('/user/register',
            {
                token: 'guest',
                userName: userName,
                passWord: passWord,
                cfpsWord: cfPassWord
            }).then((response)=> {
            let res = response.body;
            if (!res.code) {
                let userInfo = {
                    token: res.token,
                    userName: userName,
                    userId: res.userId
                };
                LS.setItem('userInfo', userInfo);
                Vue.http.headers.common['access-token'] = userInfo.token;
                state.isLogin = true;
                Materialize.toast(res.msg, 3000);
                router.push({path: '/list/' + userInfo.userId})
            }
            else Materialize.toast(res.msg, 3000);
        }, (response)=> {
            Materialize.toast("注册失败,请检查网络配置!", 3000);
        }).then(()=> {
            state.isLoaded = true;
        })
    },
    LOGOUT(state){
        LS.clear();
        state.isLogin = false;
        router.push({path: '/'});
    }
}

export default {
    state,
    mutations
}