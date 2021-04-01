<template>
    <div class="tab-content">
        <CommonButton />
        <div class="device-type">    
            <span class="title">System Core</span>
            <io-t-device pic_url = "server.png" name="Server"></io-t-device>
        </div>
        <div class="device-type"> 
            <span class = "title">Sercurity Devices</span>
            <io-t-device pic_url = "camera.png" name="Camera"></io-t-device>
        </div>        
        <div class="device-type">         
            <span class = "title">Door and window</span>
            <io-t-device pic_url = "dooropen.png" name="Door"></io-t-device>
            <io-t-device pic_url = "curtains.png" name="Curtain"></io-t-device>
        </div>
        <div class="device-type">         
            <span class = "title">Houseware</span>
            <io-t-device pic_url = "coffemaker.png" name="Coffee Maker"></io-t-device>
            <io-t-device pic_url = "thermometer.png" name="Thermometer"></io-t-device>
            <io-t-device pic_url = "oven.png" name="Oven"></io-t-device>
        </div> 
    </div>
</template>

<script>
import IoTDevice from './IoTDevice.vue'
import CommonButton from './CommonButton.vue'

export default {
    props: {

    },
    
    components:{
        IoTDevice,
        CommonButton
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-content {
    position: absolute;
    display: block;
    background-color: white;
    border-right: 1px solid #ccc;
    margin-top: 0px;
    margin-left: 60px;
    width: fit-content;
    height: 897px;
    font : inherit;
}
.device-type {
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 10px;
}
.title {
    font: inherit;
    display: flex;
    margin-left: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
}
</style>
