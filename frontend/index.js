import Vue from "vue/dist/vue.min";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import VueHead from "vue-head";
import store from "./vuex/store";
import App from "./components/App.vue";
import Login from "./components/User/Login.vue";
import Register from "./components/User/Register.vue";
import TodoList from "./components/Todos/TodoList.vue";
import {LS} from "./helpers/Utils";

Vue.use(VueRouter);
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
            return Materialize.toast(response.body.msg,3000,'',()=>{
                store.commit("logout");
                router.push({path:'/'})
            })
        }
    })
})

//路由配置
const routes=[
    {
        path: '/',
        component: App,
        redirect:'/login',
        children: [
            {
                path: '/login',
                component: Login
            },
            {
                path:'/register',
                component: Register
            },
            {
                path:'/list/:userId',
                component: TodoList
            }
        ]
    }
];

const router=new VueRouter({
    routes,
});

const app=new Vue({
    router,
    store
}).$mount('#App');

export default router;