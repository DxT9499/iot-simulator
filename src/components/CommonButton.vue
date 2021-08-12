<template>
    <div class="upload-map-button">
        <div class="commonbutton">
            <p><input type="file"  accept="image/*" name="image" id="file"  @change="loadFile"></p>
            <p><label for="file">Upload Your Map</label></p>
        </div>
    </div>
</template>

<script>
import { EventBus } from './event-bus.js';
export default {
    data() {
        return {
            url:''
        }
    },

    methods:{
        loadFile(event) {
            
            this.url = URL.createObjectURL(event.target.files[0]);
            EventBus.$emit("img-upload",this.url );
        }
    }
}
</script>

<style scoped>
.upload-map-button {
    margin: 20px;
}
.commonbutton {
    background-color: #F5F8FD;
    text-align: center;
    color:#888;
    border: 0.5px solid #dcdcd1;
}
.commonbutton input {
    display: none;
}
.commonbutton p,label{
    vertical-align: middle;
    cursor: pointer;
}
</style>