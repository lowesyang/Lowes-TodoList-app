<template>
    <div>
        <div class="header">
            <div class="con">
                <div class="title" v-bind:class="{'noLogin':!isLogin,'fl':isLogin}">LowesTodos</div>
                <form>
                    <div class="input-field fr" v-if="isLogin">
                        <i class="material-icons prefix">search</i>
                        <input type="text" id="keywords" class="validate" v-model="keywords" @input="goSearch(keywords)">
                        <label for="keywords">待做事项</label>
                    </div>
                </form>
                <div class="cl"></div>
            </div>
        </div>
        <div class="progress" v-show="!isLoaded">
            <div class="indeterminate"></div>
        </div>
    </div>
</template>
<style scoped>
    .header{
        width:100%;
        height:60px;
        line-height:60px;
        background-color: #039be5;
    }
    .header>.con{
        width:80%;
        min-width:800px;
        max-width:1200px;
        margin:0px auto;
        padding:0px 2%;
    }
    .header .title{
        font-size:24px;
        color:white;
    }
    .header .title.noLogin{
        text-align: center;
    }
    .header .input-field{
        margin-top:0;
        height:50px;
    }
    .header .input-field>i{
        color:#cccccc;
        font-size:28px;
        margin-top: 18px;
        margin-left:10px;
    }
    .header .input-field input{
        font-size:14px;
        width:100px;
        height:30px;
        color:white;
        margin-top:12px;
    }
    .header .input-field input:focus{
        width:250px;
        border-bottom: 1px solid white;
        box-shadow: 0 1px 0 0 white;
    }
    .header .input-field input:focus+label{
        color:white;
    }
    .header .input-field input+label{
        color:#cccccc;
        height:20px;
        margin-top: -10px;
    }
    .header .input-field input+label.active{
        margin-top:0px;
    }
    .header .input-field .prefix.active{
        color:white;
    }
    .progress{
        position: fixed;
        top:60px;
        margin:0;
    }
</style>
<script>
    import {mapGetters,mapActions} from "vuex";
    export default{
        data(){
            return{
                keywords:''
            }
        },
        computed:{
            ...mapGetters(['isLoaded','isLogin'])
        },
        methods:{
            ...mapActions({
                goSearch:'goSearch'
            })
        }
    }
</script>
