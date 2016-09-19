<template>
    <li>
        <div class="collapsible-header">
            <div class="completeBtn fl">
                <input type="checkbox" class="filled-in" id={{itemId}} />
                <label for={{itemId}}></label>
            </div>
            {{title}}
            <div class="deleteBtn fr" @click.stop="deleteItem">
                <i class="material-icons">delete</i>
            </div>
        </div>
        <div class="collapsible-body">
            <p>{{content}}</p>
        </div>
    </li>
</template>
<style scoped>
    .listBox .completeBtn{
        width:25px;
        height:25px;
        margin-top: 10px;
        margin-right:10px;
    }
    .listBox .deleteBtn{
        position: relative;
        z-index:10;
        margin-right:-15px;
    }
</style>
<script>
    export default{
        props:{
            title:String,
            content:String,
            itemId:[String,Number]
        },
        methods:{
            deleteItem(){
                alert("delete")
            }
        }
    }
</script>
