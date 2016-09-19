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
                <a class="waves-effect btn-flat" v-link="{path:'register'}">去注册</a>
                <button type="submit" class="btn waves-effect light-blue darken-1" @click.prevent="goLogin(this.userName,this.passWord)" >登录</button>
            </div>
        </form>
    </div>
</template>
<style>
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
    import {goLogin} from "./actions";
    export default{
        data(){
            return{
                userName:'',
                passWord:''
            }
        },
        route:{
            data({next,redirect}){
                let userInfo=LS.getItem('userInfo');
                if(userInfo && userInfo.token) redirect('/list/'+userInfo.userId);
                else next();
            }
        },
        vuex:{
            actions:{
                goLogin:goLogin
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
