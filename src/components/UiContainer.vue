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
import {HTTP} from './http-common';
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
                    positionX: ev.clientX - 25 + "px",
                    positionY: ev.clientY - 25 + "px"
                })
                this.next_device_id++
                this.new_device_url=''
                this.new_device_name=''
                
            }
        },
        
        
    },
    created() {
        // const headers = { 
        //     "Authorization": "Bearer oh.test.PgGrq56Et45iSxmZ3546lpi7BQbSiJC3HX8kBVjtVCBJ0AaYc26FAEaOaBpkaQHQm6jKLPqWoBZhmkPUm8w",
        //     "Content-Type": "text/plain",
        //     "Access-Control-Allow-Origin": "*"
        // };
        const headers_json = {
            "Authorization": "Bearer oh.test.PgGrq56Et45iSxmZ3546lpi7BQbSiJC3HX8kBVjtVCBJ0AaYc26FAEaOaBpkaQHQm6jKLPqWoBZhmkPUm8w",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
        HTTP.get(`sitemaps`).then(response=> {
            console.log(response.data)
            this.data = response.data[0].label
            console.log(this.data)
            }).catch(err => {
            console.log(err.response);
        });
        HTTP.get(`items`).then(response=> {
            console.log(response.data)
            this.data = response.data[0].label
            console.log(this.data)
            }).catch(err => {
            console.log(err.response);
        });
        console.log(this.devices)
        var item = {
            "type": "Switch",
            "name": "test1",
            "label": "test1",
            "category": "",
            "tags": [
            "House"
            ],
            "groupNames": [
            ""
            ],
            "groupType": "",
            "function": {
                "name": "string",
                "params": [
                    "string"
                ]
            }
        }
        // HTTP.post(`items/NewItem`, 'ON', {headers:headers}).then()
        HTTP.get(`items/NewItem/state`).then(response=> {
            console.log(response.data)
        })
        HTTP.put(`items/test1`,item,{headers:headers_json}).then()
    },
    mounted() {
        EventBus.$on("img-upload",url => {
            this.background_url = url
        })
        EventBus.$on("device-data", (data_url,data_name)=>{
            this.new_device_url = data_url
            this.new_device_name = data_name
        })
    }
}
</script>

<style scoped>
.ui-container {
    float: right;
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