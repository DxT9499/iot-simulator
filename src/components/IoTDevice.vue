<template>
    <div class="iot-device" @click="getDevice">
        <img :src = "require(`../assets/iot-devices/${pic_url}`)">
        <span class="name">{{name}}</span>
        <span class="tooltiptext">Select and set</span>
    </div>
</template>

<script>
import { EventBus } from './event-bus.js';
export default ({
    name:'IoTDevice',
    
    props:{
        pic_url: String,
        name : String
    },
    methods: {
        getDevice(){
            EventBus.$emit("device-data",this.pic_url,this.name);
        }
    }
})
</script>

<style scoped>
.iot-device {
    width: 100px;
    height: 100px;
    display: inline-block;
    border-radius: 3px;
    margin-left: 9px;
}

.iot-device:hover {
    background-color: #E1ECFF;
}

img {
    position: relative;
    display: block;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 50px;
    height: 50px;
}
.iot-device .name {
    margin-top: 2px;
    display: block;
    text-align: center;
    color: gray;
}
.iot-device .tooltiptext {
    visibility: hidden;
    width: fit-content;
    height: fit-content;
    background-color: #40B882;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    bottom: 100%;
    left: 50%;
    margin-left: -2px; 
}
.iot-device:hover .tooltiptext {
    visibility: visible;
}
</style>
