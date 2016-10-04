<template>
    <li>
        <div class="collapsible-header">
            <div class="completeBtn fl">
                <input v-if="!completed" type="checkbox" :id="itemId" @click="completeItem(itemId)" />
                <input v-else type="checkbox" :id="itemId" checked="checked" disabled="disabled"/>
                <label :for="itemId"></label>
            </div>
            {{title}}
            <div class="dropdown-button menuBtn fr" :data-activates="'itemMenu'+itemId" @click.stop>
                <i class="material-icons">list</i>
            </div>
            <ul :id="'itemMenu'+itemId" class="dropdown-content">
                <li href="#addTagsBox" class="modal-trigger" @click.stop="showTagsBox(itemId)"><i class="material-icons">label_outline</i><span>标签</span></li>
                <li class="divider"></li>
                <li @click.stop="deleteItem(itemId)"><i class="material-icons">delete</i><span>删除</span></li>
            </ul>
            <div class="addTime fr">{{time}}</div>
            <div class="chip fr" v-if="tag && tag.length">{{tag}}</div>
            <div class="cl"></div>
        </div>
        <div class="collapsible-body">
            <p>{{content}}</p>
        </div>
    </li>
</template>
<style scoped>
    li{
        width:100%;
    }
    .listBox .completeBtn{
        width:25px;
        height:25px;
        margin-top: 8px;
        margin-right:10px;
    }
    .listBox .menuBtn{
        width:35px;
        margin-right:-15px;
    }
    .listBox .addTime{
        font-size:14px;
        margin-right:20px;
    }
    .dropdown-content li>span{
        color:#666666;
        font-size:14px;
    }
    .dropdown-content li>i{
        color:#666666;
        font-size:18px;
        margin-top: 2px;
    }
    .chip{
        margin-top: 6px;
        margin-right:15px;
    }
</style>
<script>
    import {mapActions} from "vuex";
    import LS from "../../helpers/LocalStorage";
    export default{
        data(){
            $(function(){
                $('.dropdown-button').dropdown({
                    inDuration:300,
                    constrain_width:false,
                    outDuration:225,
                    hover:true,
                    gutter:0,
                    belowOrigin:false,
                    alignment:'left'
                });
                $('.modal-trigger').leanModal({
                    in_duration:300,
                    out_duration:200
                })
            });
            return {
            }
        },
        props:{
            title:String,
            content:String,
            itemId:[String,Number],
            time:String,
            completed:Boolean,
            tag:String
        },
        methods:{
            ...mapActions({
                deleteItem:'deleteItem',
                completeItem:'completeItem'
            }),
            showTagsBox(itemId){
                LS.setItem('activeItem',itemId);
                $('#addTagsBox').openModal();
            }
        }
    }
</script>
