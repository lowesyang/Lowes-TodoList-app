<template>
    <div class="todoBox">
        <div class="listBox fl">
            <Tabs></Tabs>
            <transition-group name="item" tag="ul" class="collapsible" data-collapsible="accordion">
                <li v-for="item in list"
                    :key="item.id"
                >
                    <div class="collapsible-header">
                        <div class="completeBtn fl">
                            <input v-if="!item.completed" type="checkbox" :id="item.id" @click="completeItem(item.id)" />
                            <input v-else type="checkbox" :id="item.id" checked="checked" disabled="disabled"/>
                            <label :for="item.id"></label>
                        </div>
                        {{item.title}}
                        <div class="deleteBtn fr" @click.stop="deleteItem(item.id)">
                            <i class="material-icons">delete</i>
                        </div>
                        <div class="addTime fr">{{item.time}}</div>
                        <div class="cl"></div>
                    </div>
                    <div class="collapsible-body">
                        <p>{{item.content}}</p>
                    </div>
                </li>
            </transition-group>
            <div class="preloader-wrapper active" v-if="!listLoaded">
                <div class="spinner-layer ">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>
            </div>
            <div class="noResWarning" v-if="!list.length && listLoaded">{{noRes}}</div>
        </div>
        <div class="addBox fr">
            <Add-item></Add-item>
            <a class="waves-effect waves-light btn red logoutBtn" @click.stop="logOut">登出</a>
        </div>
        <div class="cl"></div>
    </div>
</template>
<style scoped>
    .todoBox{
        width:80%;
        min-width:800px;
        max-width:1200px;
        margin:0px auto;
        padding:0px 2%;
    }
    .todoBox>.addBox{
        margin-top: 65px;
        width:30%;
    }
    .todoBox>.listBox{
        position: relative;
        width:65%;
        margin-top:10px;
    }
    .todoBox>.listBox>ul{
    }
    .todoBox>.listBox li{
        width:100%;
    }
    .todoBox>.listBox .completeBtn{
        width:25px;
        height:25px;
        margin-top: 8px;
        margin-right:10px;
    }
    .todoBox>.listBox .deleteBtn{
        width:35px;
        margin-right:-15px;
    }
    .todoBox>.listBox .addTime{
        font-size:14px;
        margin-right:20px;
    }
    .item-enter-active,.item-leave-active{
        -webkit-transition: opacity .3s ease;
        -moz-transition: opacity .3s ease;
        -ms-transition: opacity .3s ease;
        -o-transition: opacity .3s ease;
        transition: opacity .3s ease;
    }
    .item-move{
        -webkit-transition: transform .3s cubic-bezier(.55, 0, .1, 1);
        -moz-transition: transform .3s cubic-bezier(.55, 0, .1, 1);
        -ms-transition: transform .3s cubic-bezier(.55, 0, .1, 1);
        -o-transition: transform .3s cubic-bezier(.55, 0, .1, 1);
        transition: transform .3s cubic-bezier(.55, 0, .1, 1);
    }
    .item-enter{
        opacity:0;
    }
    .item-leave-active{
        opacity:0;
        position: absolute;
    }
    .todoBox>.addBox>.logoutBtn{
        margin-top: 20px;
    }
    .todoBox>.listBox>.preloader-wrapper{
        display: block;
        margin: 0px auto;
    }
    .todoBox>.listBox>.noResWarning{
        font-size:20px;
        color:#cccccc;
        text-align: center;
    }
</style>
<script>
    import AddItem from "./AddItem.vue";
    import Tabs from "./Tabs.vue";
    import LS from "../../helpers/LocalStorage";
    import {initList,deleteItem,completeItem} from "../../vuex/actions";
    import {logOut} from "../../vuex/actions";
    import {mapActions,mapGetters} from "vuex";

    export default{
        data(){
            $(function(){
                $('.collapsible').collapsible({
                    accordion:false
                });
            });
            this.$store.dispatch('initList');
            return{
            }
        },
        components:{
            AddItem,
            Tabs
        },
        computed:{
            ...mapGetters({
                list:'listFilter',
                noRes:'getNoResForList',
                listLoaded:'listLoaded'
            })
        },
        methods:{
            ...mapActions({
                initList:'initList',
                deleteItem:'deleteItem',
                completeItem:'completeItem',
                logOut:'logOut'
            })
        },
        beforeRouteEnter(to,from,next){
            let userInfo=LS.getItem('userInfo');
            if(userInfo && userInfo.token) {
                next();
            }
            else {
                Materialize.toast('请先登录!',3000);
                next({path:'/'});
            }
        },
        head:{
            title(){
                return {
                    inner:'App'
                }
            }
        }
    }
</script>
