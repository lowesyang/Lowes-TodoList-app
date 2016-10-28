import Vue from "vue/dist/vue.min";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//组件懒加载
const App=resolve=>{
    require.ensure(['../components/App.vue'],()=>{
        resolve(require('../components/App.vue'))
    })
};
const Login=resolve=>{
    require.ensure(['../components/User/Login.vue'],()=>{
        resolve(require('../components/User/Login.vue'))
    })
};
const Register=resolve=>{
    require.ensure(['../components/User/Register.vue'],()=>{
        resolve(require('../components/User/Register.vue'))
    })
};
const TodoList=resolve=>{
    require.ensure(['../components/Todos/TodoList.vue'],()=>{
        resolve(require('../components/Todos/TodoList.vue'))
    })
};

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

export default router;