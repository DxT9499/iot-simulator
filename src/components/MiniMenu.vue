<template>
    <div class="mini-menu-container">
        <div class="mini-menu">
            <button class="menu-item" v-on:click="isShow=!isShow">Status</button>
            <button class="menu-item" @click="deleteDevice">Delete</button>
        </div>
        <div class="status-device" v-if= "isShow">
            <label class="device-info">Name : </label>
            <input class="device-info" type="text" v-model="name">
            <label class="device-info">Label : </label>
            <input class="device-info" type="text" v-model="label">
            <label class="device-info">Type : </label>
            <select class="device-info" v-model="typeSelected">
                <option value=""></option>
                <option v-for="type in types" :key="type.name">{{ type.name }}</option>
            </select>
            <label class="device-info">Class : </label>
            <select class="device-info" v-model="classSelected">
                <option value=""></option>
                <option v-for="Class in classes" :key="Class.name">{{ Class.name }}</option>
            </select>
            <button id="edit-button" class="button-in-status">Edit</button> <button id="submit-button" class="button-in-status" @click="submitItem">Submit</button>
        </div>
    </div>

</template>

<script>
import {HTTP} from './http-common.js'
export default {
    data() {
        return {
            isShow: false,
            name: ``,
            label: '',
            typeSelected:'',
            classSelected:'',
            types: [
                {name: 'Switch'},
                {name: 'Number'}
            ],
            classes: [
                {name: 'House'},
                {name: 'Garage'},
                {name: 'Bathroom'},
                {name: 'Bedroom'},
                {name: 'Kitchen'},
                {name: 'LivingRoom'}
            ]
        }
    },
    methods:{
        submitItem: function() {
            console.log(this.name)
            console.log(this.label)
            console.log(this.typeSelected)
            console.log(this.classSelected)
            var item = {
                "type": this.typeSelected,
                "name": this.name,
                "label": this.label,
                "category": "",
                "tags" : [ this.classSelected ],
                "groupNames": [""],
                "groupType": "",
                "function": {
                    "name": "",
                    "params": [
                        ""
                    ]
                }
            }
            let url = `items/`+this.name
            HTTP.put(url,item).then(response=>{
                console.log(response.data)
            })
        },
        deleteDevice: function() {
            let url = 'items/'+this.name
            HTTP.delete(url).then(response=>{
                console.log(response.data)
            })
            this.$emit('deleteDevice','delete')
        }
    },

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
    margin-left: 5px;
    margin-top: 5px;
}

.mini-menu-container .status-device label{
    color:black;
}

.mini-menu-container .status-device input {
    width: 90%;
}

.mini-menu-container .status-device .button-in-status {
    margin-top: 10px;
    margin-bottom: 5px;
    border: none;
    background-color: green;
    color: white;
    width: 100px;
    height: 30px;
}

.mini-menu-container .status-device #edit-button {
    margin-left: 5px;
}

.mini-menu-container .status-device #submit-button {
    margin-left: 80px;
}


</style>