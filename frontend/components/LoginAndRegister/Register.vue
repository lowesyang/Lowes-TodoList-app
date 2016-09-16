<template>
    <div class="card registerBox">
        <div class="title">注册</div>
        <form>
            <div class="input-field">
                <input type="text" id="usrName" class="validate" v-model="userName" />
                <label for="usrName">用户名</label>
            </div>
            <div class="input-field">
                <input type="password" id="psWord" class="validate" v-model="passWord"/>
                <label for="psWord">密码</label>
            </div>
            <div class="input-field">
                <input type="password" id="cfpsWord" class="validate" v-model="cfPassWord"/>
                <label for="cfpsWord">确认密码</label>
            </div>
            <div class="input-field buttonTag">
                <a class="waves-effect btn-flat" v-link="{path:'login'}">去登陆</a>
                <button type="submit" class="btn waves-effect light-blue darken-1" @click.prevent="goRegister(this.userName,this.passWord,this.cfPassWord)" >注册</button>
            </div>
        </form>
    </div>
</template>
<style>
    .registerBox{
        width:460px;
        margin:60px auto;
        border-radius:10px;
        padding:20px 0px;
    }
    .registerBox>.title{
        font-size:24px;
        text-align: center;
    }
    .registerBox>form{
        width:90%;
        margin:0px auto;
    }
    .registerBox .buttonTag{
        text-align: right;
    }
    .registerBox .buttonTag>a{
        text-decoration: none;
    }
</style>
<script>
    import LS from "../../helpers/LocalStorage";
    import {goRegister} from "../../vuex/actions";
    export default{
        data(){
            return{
                userName:'',
                passWord:'',
                cfPassWord:''
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
                goRegister:goRegister
            }
        }
    }
</script>
