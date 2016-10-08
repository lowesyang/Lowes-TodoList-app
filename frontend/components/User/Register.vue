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
                <router-link class="waves-effect btn-flat" to="/login">去登陆</router-link>
                <button type="submit" class="btn waves-effect light-blue darken-1" @click.prevent="goRegister(this.userName,this.passWord,this.cfPassWord)" >注册</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
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
    import {LS} from "../../helpers/Utils";
    import {goRegister} from "../../vuex/actions";
    export default{
        data(){
            return{
                userName:'',
                passWord:'',
                cfPassWord:''
            }
        },
        beforeRouteEnter(to,from,next){
            let userInfo=LS.getItem('userInfo');
            if(userInfo && userInfo.token) next('/list/'+userInfo.userId);
            else next();
        },
        methods:{
            goRegister(userName,passWord,cfpsWord){
                this.$store.dispatch('goRegister',{
                    usrName:userName,
                    psWord:passWord,
                    cfpsWord:cfpsWord
                })
            }
        },
        head:{
            title(){
                return {
                    inner:'注册'
                }
            }
        }
    }
</script>
