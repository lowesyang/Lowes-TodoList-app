<template>
    <div class="todoBox">
        <div class="listBox fl">
            <Tabs></Tabs>
            <transition-group name="item" tag="ul" class="collapsible" data-collapsible="accordion">
                <Todo-item
                    v-for="item in list"
                    :key="item.id"
                    :title="item.title"
                    :content="item.content"
                    :itemId="item.id"
                    :time="item.time"
                    :completed="item.completed"
                    :tag="item.tag"
                >
                </Todo-item>
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
        <Add-tags></Add-tags>
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
    import TodoItem from "./TodoItem.vue";
    import AddTags from "./AddTagsModal.vue";
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
            Tabs,
            TodoItem,
            AddTags
        },
        computed:{
            ...mapGetters({
                list:'listFilter',
                noRes:'getNoResForList',
                listLoaded:'listLoaded'
            })
        },
        methods:{
            ...mapActions(['initList','logOut'])
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
