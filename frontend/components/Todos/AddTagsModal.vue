<template>
    <div>
        <div id="addTagsBox" class="modal">
            <div class="modal-content">
                <h5>添加标签</h5>
                <p class="notice">若已添加则将替换已有标签</p>
                <div class="input-field">
                    <input id="tags" type="text" class="validate" :value="tag" @input="updateTag" @ @keyup.enter="addTag">
                    <label for="tags">标签</label>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-action waves-effect waves-green btn-flat" @click.stop="addTag(tag)">添加</a>
            </div>
        </div>
    </div>
</template>
<style scoped>
    #addTagsBox{
        width:60%;
        max-width:600px;
        min-width:320px;
    }
    .notice{
        color:#999999;
    }
</style>
<script>
    import {LS} from "../../helpers/Utils";
    export default{
        data(){
            return{
            }
        },
        computed:{
            tag(){
                return this.$store.getters.addTag;
            }
        },
        methods:{
            addTag(){
                let itemId=LS.getItem('activeItem');
                this.$store.dispatch('addTag',itemId);
            },
            updateTag(e){
                this.$store.dispatch('updateTag',e)
            }
        }
    }
</script>
