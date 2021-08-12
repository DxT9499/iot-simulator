<template>
    <div id="dragable-container" class="ui-container" ref="draggableContainer" v-on:click="createDevice" v-bind:style="{ background: 'url(' + background_url + ') no-repeat center' }">
        <device-on-map
            v-for = "(device,index) in devices"
            v-bind:key="device.device_id"
            v-bind:pic_url="device.device_url"
            v-bind:name="device.device_name"
            v-on:remove="devices.splice(index, 1)" 
            v-bind:positionX="device.positionX"
            v-bind:positionY="device.positionY"
        />
        
    </div>
</template>

<script>
import DeviceOnMap from './DeviceOnMap.vue';
import { EventBus } from './event-bus.js';

export default {
    data() {
        return {
            isShow: false,
            background_url: '',
            new_device_url: '',
            new_device_name:'',
            devices: [],
            next_device_id: 1,
            
        }
    },
    props:{
        
    },
    components: {
        DeviceOnMap
    },
    methods: {
        createDevice(ev) {
            if(this.new_device_url != '') {
                this.devices.push({
                    device_id: this.next_device_id,
                    device_url: this.new_device_url,
                    device_name: this.new_device_name,
                    positionX: ev.pageX - 50 - 401 + "px",
                    positionY: ev.pageY - 75 + "px"
                })
                this.next_device_id++
                this.new_device_url=''
                this.new_device_name=''
                
            }

        },
        
        
    },
    mounted() {
        EventBus.$on("img-upload",url => {
            this.background_url = url
        })
        EventBus.$on("device-data", (data_url, data_name)=>{
            this.new_device_url = data_url
            this.new_device_name = data_name
        })
    }   
}
</script>

<style scoped>
.ui-container {
    position: absolute;
    margin-left: 401px;
    background-color: #F1F3F8;
    width: 1519px;
    height: 897px;
}



</style>