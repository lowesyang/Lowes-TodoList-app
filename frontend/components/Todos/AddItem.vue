<template>
    <div class="card addItemBox">
        <div class="title">添加待做事项</div>
        <form>
            <div class="input-field">
                <input type="text" id="addTitle" class="validate " v-model="title" />
                <label for="addTitle">标题</label>
            </div>
            <div class="input-field">
                <textarea
                        id="addContent"
                        class="materialize-textarea "
                        v-model="content"
                >
                </textarea>
                <label for="addContent">详细内容</label>
            </div>
            <button
                    type="submit"
                    class="btn-floating btn-normal waves-effect light-blue darken-1 fr"
                    @click.prevent="addItem(this.title,this.content)"
            >
                <i class="material-icons">add</i>
            </button>
            <div class="cl"></div>
        </form>
    </div>
</template>
<style>
    .addItemBox{
        width:100%;
        margin:0px auto;
        padding:20px;
    }
    .addItemBox>.title{
        font-size:20px;
    }
    .addItemBox>form{
        margin-top:24px;
    }
    .addItemBox>form input{
        font-size:14px;
    }
</style>
<script>
    import {addItem} from "./actions";
    export default{
        data(){
            return{
                title:'',
                content:''
            }
        },
        vuex:{
            actions:{
                addItem:addItem
            }
        }
    }
</script>
