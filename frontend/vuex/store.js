import Vue from "vue";
import Vuex from "vuex";
import LS from "../helpers/LocalStorage";
import router from "../index";
import moment from "moment";
Vue.use(Vuex);

const state={
    filter:'NOT_COMPLETED',
    list:[],
    isLoaded:true,
    listLoaded:true
}

const mutations={
    LOGIN(state,userName,passWord){
        if(!userName) return Materialize.toast("用户名不得为空!",3000);
        if(!passWord) return Materialize.toast("密码不得为空!",3000);
        state.isLoaded=false;
        Vue.http.post('/user/login',
            {
                token:'guest',
                userName:userName,
                passWord:passWord
            }).then((response)=>{
                let res=response.body;
                if(!res.code){
                    let userInfo={
                        token:res.token,
                        userName:userName,
                        userId:res.userId
                    };
                    LS.setItem('userInfo',userInfo);
                    Vue.http.headers.common['access-token']=userInfo.token;
                    Materialize.toast(res.msg,1000);
                    router.go({path:'/list/'+userInfo.userId})
                }
                else Materialize.toast(res.msg,3000);
            },(response)=>{
                Materialize.toast("登录失败,请检查网络配置!",3000);
            }).then(()=>{
                state.isLoaded=true;
        })
    },
    REGISTER(state,userName,passWord,cfPassWord){
        if(!userName) return Materialize.toast("用户名不得为空!",3000);
        if(!passWord) return Materialize.toast("密码不得为空!",3000);
        if(passWord!=cfPassWord) return Materialize.toast("两次密码输入不一致!",3000);
        state.isLoaded=false;
        Vue.http.post('/user/register',
            {
                token:'guest',
                userName:userName,
                passWord:passWord,
                cfpsWord:cfPassWord
            }).then((response)=>{
                let res=response.body;
                if(!res.code){
                    let userInfo={
                        token:res.token,
                        userName:userName,
                        userId:res.userId
                    };
                    LS.setItem('userInfo',userInfo);
                    Vue.http.headers.common['access-token']=userInfo.token;
                    Materialize.toast(res.msg,3000);
                    router.go({path:'/list/'+userInfo.userId})
                }
                else Materialize.toast(res.msg,3000);
            },(response)=>{
                Materialize.toast("注册失败,请检查网络配置!",3000);
            }).then(()=>{
            state.isLoaded=true;
        })
    },
    INITLIST(state){
        let userInfo=LS.getItem('userInfo');
        state.listLoaded=false;
        Vue.http.get('/list/'+userInfo.userId).then((response)=>{
            let res=response.body;
            if(!res.code){
                state.list=res.list;
            }
            else{
                Materialize.toast(res.msg,3000);
            }
        },(response)=>{
            Materialize.toast("获取列表失败，请检查网络配置!",3000);
        }).then(()=>{
            state.isLoaded=state.listLoaded=true;
        })
    },
    ADDITEM(state,item){
        if(item.title=="") return Materialize.toast('事项标题不得为空!',3000);
        let userInfo=LS.getItem('userInfo');
        state.isLoaded=false;
        Vue.http.post('/list/addItem',
            {
                userId:userInfo.userId,
                title:item.title,
                content:item.content
            }).then((response)=>{
                let res=response.body;
                if(!res.code){
                    let newItem={
                        ...item,
                        id:res.newId,
                        completed:0,
                        deleted:0
                    };
                    state.list.push(newItem);
                }
                else Materialize.toast(res.msg,3000);
            },(response)=>{
                Materialize.toast('获取列表失败，请检查网络配置!',3000);
            }).then(()=>{
            state.isLoaded=true;
        })
    },
    DELETEITEM(state,index){
        let userInfo=LS.getItem('userInfo');
        state.isLoaded=false;
        Vue.http.put('/list/deleteItem',
            {
                userId:userInfo.userId,
                itemId:index
            }).then((response)=>{
                let res=response.body;
                if(!res.code){
                    for(var i=0;i<state.list.length;i++){
                        if(state.list[i].id==index) {
                            state.list.splice(i,1);
                            break;
                        }
                    }
                }
                Materialize.toast(res.msg,3000);
            },(response)=>{
                Materialize.toast('删除事项失败，请检查网络配置!',3000);
            }).then(()=>{
            state.isLoaded=true;
        })
    },
    COMPLETEITEM(state,index){
        let userInfo=LS.getItem('userInfo');
        state.isLoaded=false;
        Vue.http.put('/list/completeItem',
            {
                userId:userInfo.userId,
                itemId:index
            }).then((response)=>{
            let res=response.body;
            if(!res.code){
                for(let i=0;i<state.list.length;i++){
                    if(state.list[i].id==index) {
                        state.list[i].completed=1;
                        break;
                    }
                }
            }
            Materialize.toast(res.msg,3000);
        },(response)=>{
            Materialize.toast('完成事项失败，请检查网络配置!',3000);
        }).then(()=>{
            state.isLoaded=true;
        })
    },
    CHANGEFILTER(state,type){
        state.filter=type;
    }
}

export default new Vuex.Store({
    state,
    mutations
})