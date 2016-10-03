<template>
    <div class="app">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<!--局部css-->
<style scoped>
    .app{
        width:100%;
    }
</style>

<!--全局CSS-->
<style>
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
</style>

<script>
    import LS from "../helpers/LocalStorage";
    import Header from "./Common/Header.vue";

    export default{
        data(){
            return {
            }
        },
        components:{
            Header
        }
    }
</script>
