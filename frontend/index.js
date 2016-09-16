import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import VueAnimatedList from "vue-animated-list";
import App from "./components/App.vue";
import Login from "./components/LoginAndRegister/Login.vue";
import Register from "./components/LoginAndRegister/Register.vue";
import TodoList from "./components/Todos/TodoList.vue";
import LS from "./helpers/LocalStorage";

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueAnimatedList);

Vue.http.options.root='/';
let userInfo=LS.getItem('userInfo');
Vue.http.headers.common['access-token']=userInfo?userInfo.token:"";

const router=new VueRouter();
const Root=Vue.extend({});

//-------handle response processing-------
Vue.http.interceptors.push((request,next)=>{
    next((response)=>{
        if(response.body.code==-1){
            return Materialize.toast(response.body.msg,3000,'',()=>{
                router.go({path:'/'})
            })
        }
    })
})

router.map({
    '/':{
        component:App,
        subRoutes:{
            '/login':{
                component:Login
            },
            '/register':{
                component:Register
            },
            '/list/:userId':{
                component:TodoList
            }
        }
    },
});

router.redirect({
    '/': '/login'
});

router.start(Root,"#app");

export default router;