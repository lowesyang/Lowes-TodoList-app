import Vue from "vue/dist/vue.min";
import {DecorateTime,LS,DeepClone} from "../../helpers/Utils";
import moment from "moment";

const state={
    isLoaded:true,
    addItem:{
        title:'',
        content:''
    },
    addTag:'',
    filter:'NOT_COMPLETED',
    list:[],    //用于显示的列表
    store_list:[],  //用于存储服务器返回的列表
    listLoaded:true   //todolist响应loading
};

const initState=DeepClone(state);

const mutations={
    INITLIST(state){
        let userInfo=LS.getItem('userInfo');
        state.listLoaded=false;
        Vue.http.get('/list/'+userInfo.userId).then((response)=>{
            let res=response.body;
            if(!res.code){
                let now=moment();
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
            state.listLoaded=true;
            state.list=state.store_list.slice();
        })
    },
    UPDATETITLE(state,data){    //不能直接赋值，否则无法引起更新
        Vue.set(state.addItem,'title',data);
    },
    UPDATECONTENT(state,data){
        Vue.set(state.addItem,'content',data);
    },
    UPDATETAG(state,data){
        state.addTag=data;
    },
    ADDITEM(state){
        let item=state.addItem;
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
                let now=moment();
                let newItem={
                    ...item,
                    id:res.newId,
                    completed:0,
                    deleted:0,
                    time:DecorateTime(res.addTime,now),
                    tag:''
                };

                state.store_list.push(newItem);
                state.addItem={
                    title:'',
                    content:''
                }
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
    },
    ADDTAG(state,itemId){
        let tag=state.addTag;
        let userId=LS.getItem('userInfo').userId;
        state.isLoaded=false;
        Vue.http.post('/list/addTag',
            {
                itemId:itemId,
                tag:tag,
                userId:userId
            }).then((response)=>{
            let res=response.body;
            if(!res.code){
                for(let i=0;i<state.store_list.length;i++){
                    if(state.store_list[i].id==itemId){
                        state.store_list[i].tag=tag;
                        break;
                    }
                }
                for(let i=0;i<state.list.length;i++){
                    if(state.list[i].id==itemId){
                        state.list[i].tag=tag;
                        break;
                    }
                }
                LS.removeItem('activeItem');
                $('#addTagsBox').closeModal();
                state.addTag='';
            }
            Materialize.toast(res.msg,3000);
        },(response)=>{
            Materialize.toast('完成事项失败，请检查网络配置!',3000);
        }).then(()=>{
            state.isLoaded=true;
        })
    },
    CLEARLIST(state){
        for(let key in initState){
            state[key]=initState[key];
        }
    }
};

export default {
    state,
    mutations
}
