import Vue from "vue/dist/vue.min";
import VueResource from "vue-resource";
import VueHead from "vue-head";
import store from "./vuex/store";
import {LS} from "./helpers/Utils";
import router from "./routes";

Vue.use(VueResource);
Vue.use(VueHead);

Vue.http.options.root='/';
Vue.http.options.timeout=12000;
let userInfo=LS.getItem('userInfo');
Vue.http.headers.common['access-token']=userInfo?userInfo.token:"";

//-------handle response processing-------
Vue.http.interceptors.push((request,next)=>{
    let hasTimeout;

    //设置timeout回调
    if(request.timeout){
        hasTimeout=setTimeout(()=>{
            next(request.respondWith(request.body,{
                status:408,
                statusText:'Request Timeout'
            }))
        },request.timeout);
    }
    next((response)=>{
        clearTimeout(hasTimeout);
        if(!response.status){
            return;
        }
        if(response.body.code==-1){
            store.commit("logout");
            return Materialize.toast(response.body.msg,3000)
        }
    })
})


const app=new Vue({
    router,
    store
}).$mount('#App');

export default router;