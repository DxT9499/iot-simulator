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
import DeviceOnMap from './DeviceOnMap.vue'
import { EventBus } from './event-bus.js';
export default {
    data() {
        return {
            isShow: false,
            background_url: '',
            new_device_url: '',
            new_device_name:'',
            devices: [],
            next_device_id: 1
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
                    positionX: ev.clientX - 25 + "px",
                    positionY: ev.clientY - 25 + "px"
                })
                this.next_device_id++
                this.new_device_url=''
                this.new_device_name=''
                // console.log(ev)
                // var device = document.createElement("img")
                // console.log(device)
                // device.src = this.device_url
                // device.style.position="absolute"
                // device.style.left = ev.clientX - 25 + "px"
                // device.style.top = ev.clientY - 25 + "px"
                // device.style.height = "50px"
                // device.style.width = "50px"
                // device.dra
                // ev.target.appendChild(device)
                // this.device_url = ''
            }
        },
        
        
    },
    mounted() {
        EventBus.$on("img-upload",url => {
            console.log(url)
            this.background_url = url
        })
        EventBus.$on("device-data", (data_url,data_name)=>{
            console.log(data_url)
            this.new_device_url = data_url
            this.new_device_name = data_name
        })
    }
}
</script>

<style scoped>
.ui-container {
    float: right!important;;
    background-color: #F1F3F8;
    width: 1845px;
    height: 897px;
    
}
.ui-container .home-map {
    position: absolute;
    display: block;
    margin: auto;
}

</style>