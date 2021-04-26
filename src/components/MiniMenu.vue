<template>
    <div class="mini-menu-container">
        <div class="mini-menu">
            <button class="menu-item" v-on:click="isShow=!isShow">Status</button>
            <button class="menu-item" @click="deleteDevice">Delete</button>
        </div>
        <div class="status-device" v-if= "isShow">
            <label class="device-info">Name : </label><br>
            <input class="device-info" type="text"><br>
            <label class="device-info">Label : </label><br>
            <input class="device-info" type="text"><br>
            <label class="device-info">Type : </label><br>
            <input class="device-info" type="text"><br>
            <label class="device-info">Class : </label><br>
            <input class="device-info" type="text"><br>
        </div>
    </div>

</template>

<script>
// import {HTTP} from './http-common.js'
export default {
    data() {
        return {
            isShow: false
        }
    },
    methods:{
        deleteDevice: function() {
            this.$emit('deleteDevice','delete')
        }
    }
}
</script>

<style scoped>
.mini-menu-container {
    width: 300px;
    height: fit-content;
}
.mini-menu-container .mini-menu {
    position: absolute;
    height: 40px;
    width: 300px;
}
.mini-menu-container .mini-menu .menu-item {
    display: inline-block;
    background-color: #108ee9;
    height: 40px;
    width: 150px;
    border: none;
    outline: none;
    color: white;
    text-align: center;
}

.mini-menu-container .mini-menu .menu-item:hover {
    background-color: #396EFE;
}

.mini-menu-container .status-device {
    position: absolute;
    display: block;
    height: fit-content;
    width: 298px;
    background-color: white;
    margin-top: 40px;
    border-bottom: solid 1px #108ee9;
    border-left: solid 1px #108ee9;
    border-right: solid 1px #108ee9;
    z-index: 9;
}

.mini-menu-container .status-device .device-info {
    display: block;
}

.mini-menu-container .status-device label{
    margin-top: 5px;
    margin-left: 5px;
    color:black;
}

.mini-menu-container .status-device input {
    margin-top: 5px;
    width: 90%;
    margin-left: 5px;
}

</style>