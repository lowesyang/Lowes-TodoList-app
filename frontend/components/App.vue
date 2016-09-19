<template>
    <div class="app">
        <div class="header">
            <div class="con">
                <div class="title" v-bind:class="{'noLogin':!isLogin,'fl':isLogin}">LowesTodos</div>
                <form>
                    <div class="input-field fr" v-if="isLogin">
                        <i class="material-icons prefix">search</i>
                        <input type="text" id="keywords" class="validate" v-model="keywords" @input="goSearch(keywords)">
                        <label for="keywords">todos</label>
                    </div>
                </form>
                <div class="cl"></div>
            </div>
        </div>
        <div class="progress" v-show="!isLoaded">
            <div class="indeterminate"></div>
        </div>
        <router-view></router-view>
    </div>
</template>
<style>
    .app{
        width:100%;
    }
    .app>.header{
        width:100%;
        height:60px;
        line-height:60px;
        background-color: #039be5;
    }
    .app>.header>.con{
        width:80%;
        min-width:800px;
        max-width:1200px;
        margin:0px auto;
        padding:0px 2%;
    }
    .app>.header .title{
        font-size:24px;
        color:white;
    }
    .app>.header .title.noLogin{
        text-align: center;
    }
    .input-field input[type=text]:focus + label,
    .input-field input[type=password]:focus + label,
    .input-field textarea.materialize-textarea:focus+label{
        color: #039be5;
    }
    .input-field input[type=text]:focus,
    .input-field input[type=text].valid,
    .input-field input[type=password]:focus,
    .input-field input[type=password].valid,
    .input-field textarea.materialize-textarea:focus{
        border-bottom: 1px solid #039be5;
        box-shadow: 0 1px 0 0 #039be5;
    }
    .app>.header .input-field{
        margin-top:0;
        height:50px;
    }
    .app>.header .input-field>i{
        color:#cccccc;
        font-size:28px;
        margin-top: 18px;
        margin-left:10px;
    }
    .app>.header .input-field input{
        font-size:14px;
        width:100px;
        height:30px;
        color:white;
    }
    .app>.header .input-field input:focus{
        width:250px;
        border-bottom: 1px solid white;
        box-shadow: 0 1px 0 0 white;
    }
    .app>.header .input-field input:focus+label{
        color:white;
    }
    .app>.header .input-field input+label{
        color:#cccccc;
        height:20px;
        margin-top: -8px;
    }
    .app>.header .input-field input+label.active{
        margin-top:-4px;
    }
    .app>.header .input-field .prefix.active{
        color:white;
    }
    .app>.progress{
        position: fixed;
        top:60px;
        margin:0;
    }
</style>
<script>
    import store from "../vuex/store";
    import LS from "../helpers/LocalStorage";
    import {goSearch} from "../vuex/actions";
    export default{
        data(){
            return {
            }
        },
        store,
        vuex:{
            getters:{
                isLoaded:state=>state.isLoaded,
                isLogin:state=>state.isLogin
            },
            actions:{
                goSearch:goSearch
            }
        }
    }
</script>
