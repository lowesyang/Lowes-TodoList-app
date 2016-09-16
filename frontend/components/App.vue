<template>
    <div class="app">
        <div class="title">LowesTodos</div>
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
    .app>.title{
        font-size:24px;
        width:100%;
        height:60px;
        line-height:60px;
        text-align: center;
        color:white;
        background-color: #039be5;
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
    .app>.progress{
        position: fixed;
        top:60px;
        margin:0;
    }
</style>
<script>
    import store from "../vuex/store";
    export default{
        data(){
            return {

            }
        },
        store,
        vuex:{
            getters:{
                isLoaded:state=>state.isLoaded
            }
        }
    }
</script>
