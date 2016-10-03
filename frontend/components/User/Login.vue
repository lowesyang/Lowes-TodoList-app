<template>
    <div class="card loginBox">
        <div class="title">登录</div>
        <form>
            <div class="input-field">
                <input type="text" id="usrName" class="validate" v-model="userName" />
                <label for="usrName">用户名</label>
            </div>
            <div class="input-field">
                <input type="password" id="psWord" class="validate" v-model="passWord"/>
                <label for="psWord">密码</label>
            </div>
            <div class="input-field buttonTag">
                <router-link class="waves-effect btn-flat" to="/register">去注册</router-link>
                <button type="submit" class="btn waves-effect light-blue darken-1" @click.prevent="goLogin(userName,passWord)" >登录</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
    .loginBox{
        width:460px;
        margin:60px auto;
        border-radius:10px;
        padding:20px 0px;
    }
    .loginBox>.title{
        font-size:24px;
        text-align: center;
    }
    .loginBox>form{
        width:90%;
        margin:0px auto;
    }
    .loginBox .buttonTag{
        text-align: right;
    }
    .loginBox .buttonTag>a{
        text-decoration: none;
    }
</style>
<script>
    import LS from "../../helpers/LocalStorage";
    export default{
        data(){
            return{
                userName:'',
                passWord:''
            }
        },
        beforeRouteEnter(to,from,next){
            let userInfo=LS.getItem('userInfo');
            if(userInfo && userInfo.token) next('/list/'+userInfo.userId);
            else next();
        },
        methods:{
            goLogin(userName,passWord){
                this.$store.dispatch('goLogin',{
                    usrName:userName,
                    psWord:passWord
                })
            }
        },
        head:{
            title(){
                return {
                    inner:'登录'
                }
            }
        }
    }
</script>
