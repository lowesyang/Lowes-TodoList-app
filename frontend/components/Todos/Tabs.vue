<template>
    <div class="tabsBox">
        <ul class="tabs">
            <li class="tab col s3" id="not_completed" @click="changeFilter('NOT_COMPLETED')"><a class="active"  href="#">未完成</a></li>
            <li class="tab col s3" id="show_all" @click="changeFilter('SHOW_ALL')"><a href="#">全部</a></li>
            <li class="tab col s3" id="completed" @click="changeFilter('COMPLETED')" ><a href="#">已完成</a></li>
        </ul>
    </div>
</template>
<style>
    .tabsBox>.tabs a{
        color:#039be5;
    }
    .tabsBox>.tabs a:hover{
        color:#81d4fa;
    }
    .tabsBox>.tabs .indicator{
        background-color: #039be5;
    }
</style>
<script>
    import {changeFilter} from "../../vuex/actions";
    export default{
        data(){
            $(function(){
                $('ul.tabs').tabs();
            });
            return {

            }
        },
        vuex:{
            actions:{
                changeFilter:changeFilter
            }
        }
    }
</script>
