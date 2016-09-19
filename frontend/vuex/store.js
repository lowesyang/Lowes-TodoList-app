import Vue from "vue";
import Vuex from "vuex";
import LS from "../helpers/LocalStorage";
import router from "../index";
import DecorateTime from "../helpers/DecorateTime";
import moment from "moment";
Vue.use(Vuex);

let userInfo=LS.getItem("userInfo");

const state={
    filter:'NOT_COMPLETED',
    list:[],    //用于显示的列表
    store_list:[],  //用于存储服务器返回的列表
    isLoaded:true,
    listLoaded:true,
    isLogin:userInfo && userInfo.token
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
                state.isLoaded=state.isLogin=true;
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
            state.isLoaded=state.isLogin=true;
        })
    },
    LOGOUT(state){
        LS.clear();
        state.isLogin=false;
        router.go({path:'/'});
    },
    INITLIST(state){
        let userInfo=LS.getItem('userInfo');
        state.listLoaded=false;
        Vue.http.get('/list/'+userInfo.userId).then((response)=>{
            let res=response.body;
            if(!res.code){
                let now=moment().format('D');
                state.store_list=res.list.map(item=>{
                    item.time=DecorateTime(item.time,now);
                    return item;
                });
                let list_title={};
                for(let i=0;i<state.store_list.length;i++){
                    list_title[state.store_list[i].title]=null;
                }
                $('.app>.header input.autocomplete').autocomplete({
                    data: list_title
                });
            }
            else{
                Materialize.toast(res.msg,3000);
            }
        },(response)=>{
            Materialize.toast("获取列表失败，请检查网络配置!",3000);
        }).then(()=>{
            state.isLoaded=state.listLoaded=true;
            state.list=state.store_list.slice();
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
                    let now=moment().format('D');
                    let newItem={
                        ...item,
                        id:res.newId,
                        completed:0,
                        deleted:0,
                        time:DecorateTime(res.addTime,now)
                    };

                    state.store_list.push(newItem);
                }
                else Materialize.toast(res.msg,3000);
            },(response)=>{
                Materialize.toast('获取列表失败，请检查网络配置!',3000);
            }).then(()=>{
            state.isLoaded=true;
            state.list=state.store_list.slice();
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
                    for(let i=0;i<state.store_list.length;i++){
                        if(state.store_list[i].id==index) {
                            state.store_list.splice(i,1);
                            break;
                        }
                    }
                    for(let i=0;i<state.list.length;i++){
                        if(state.list[i].id==index){
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
                for(let i=0;i<state.store_list.length;i++){
                    if(state.store_list[i].id==index) {
                        state.store_list[i].completed=1;
                        break;
                    }
                }
                for(let i=0;i<state.list.length;i++){
                    if(state.list[i].id==index){
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
    },
    GOSEARCH(state,keywords){
        state.list=state.store_list.filter(item=>item.title.indexOf(keywords)>=0);
    }
}

export default new Vuex.Store({
    state,
    mutations
})