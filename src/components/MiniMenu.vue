<template>
    <div class="mini-menu-container">
        <div class="mini-menu">
            <button class="menu-item" v-on:click="handleShow">Infor</button>
            <button class="menu-item" @click="deleteDevice">Delete</button>
        </div>
        <div class="status-device" v-if= "isShow">
            <label class="device-info">Name : *</label>
            <input class="device-info" type="text" placeholder="Alphanumeric & underscores only" v-model="nameInput" :disabled= "updateChange">
            <label class="device-info">Label : *</label>
            <input class="device-info" type="text" v-model="labelInput" :disabled= "disabled">
            <label class="device-info">Type : *</label>
            <select class="device-info" v-model="typeInput" :disabled= "disabled">
                <option value=""></option>
                <option v-for="type in types" :key="type.name">{{ type.name }}</option>
            </select>
            <label class="device-info">Tag : </label>
            <select class="device-info" v-model="tagInput" :disabled= "disabled">
                <option value=""></option>
                <option v-for="tag in tags" :key="tag.name">{{ tag.name }}</option>
            </select>
            <button id="edit-button" class="button-in-status" @click= "disabled = !disabled">Edit</button> <button id="submit-button" class="button-in-status" @click= "submitItem">Submit</button>
        </div>
    </div>

</template>

<script>

import axios from 'axios'
// import {config} from './http-common'
export default {
    props: {
        disabledEdit: Boolean,
        typeDevice: String,
        update: Boolean,
        name: String,
        label: String,
        type: String,
        tag: String,
    },
    data() {
        return {
            disabled: false,
            isShow: false,
            check: true,
            types: [
                {name: 'Switch'},
                {name: 'Number'}
            ],
            tags: [
                {name: 'House'},
                {name: 'Garage'},
                {name: 'Bathroom'},
                {name: 'Bedroom'},
                {name: 'Kitchen'},
                {name: 'LivingRoom'}
            ],
            HTTP: axios.create({
                baseURL: this.$store.getters.baseUrl + '/rest',
                headers: {
                    Authorization: this.$store.getters.apiToken,
                    ContentType: "application/json",
                    AccessControlAllowOrigin:"*"
                }
            })
        }
    },
    created() {
        if(this.disabledEdit == true) this.disabled = true
        
        console.log(this.$store.getters.apiToken)
    },
    mounted() {
        
    },
    computed: {
        nameInput: {
            get: function(){
                return this.name;
            },
            set: function(newValue){
                this.$emit('update:name', newValue)
            }
        },
        labelInput: {
            get: function(){
                return this.label;
            },
            set: function(newValue){
                this.$emit('update:label', newValue)
            }
        },
        typeInput: {
            get: function(){
                return this.type;
            },
            set: function(newValue){
                this.$emit('update:type', newValue)
            }
        },
        tagInput: {
            get: function(){
                return this.tag;
            },
            set: function(newValue){
                this.$emit('update:tag', newValue)
            }
        }, 
        updateChange: {
            get: function(){
                return this.update;
            },
            set: function(newValue){
                this.$emit('update',newValue)
            }
        },
        
    },
    methods:{
        handleShow: function() {
			if(this.typeDevice.search("server") == -1) this.isShow = !this.isShow
			else window.open(this.$store.getters.baseUrl,'_blank')
		},
        submitItem: function() {
            // EventBus.$emit("device-submit-infor", this.name, this.label, this.typeSelected, this.classSelected)
            let available = false
            for(let i = 0; i < this.name.length; i++)
                if(/^([a-zA-Z0-9_])/.test(this.name[i])) {
                    available = true
                }
                else {
                    available = false
                    break
                }
            var item = {
                "type": this.type,
                "name": this.name,
                "label": this.label,
                "category": "",
                "tags" : [ this.tag ],
                "groupNames": [""],
                "groupType": "",
                "function": {
                    "name": "",
                    "params": [
                        ""
                    ]
                }
            }
            
            
            if(this.name != '' && this.label != '' && this.type !='' && available == true){
                const url = `items/` + this.name
                this.HTTP.get(`items`).then(response=>{
                    console.log(response.data)
                    for(let i = 0; i < response.data.length; i++){
                        console.log(response.data[i].name,this.name)
                        if(response.data[i].name == this.name) this.check = false
                    }
                    if(this.check == false && this.update == false){
                        this.$emit('deleteDevice')
                        alert("Device exist!!!")
                    }
                    else if(this.check == true && this.update == false){
                        this.HTTP.put(url,item).then(response=>{
                            console.log(response.data)
                            alert("Create Success")
                        })
                        if(this.type == "Switch"){
                            this.HTTP.post(url,'OFF',{headers:{'Content-Type': 'text/plain'}}).then(response=>{
                                console.log(response.data)
                            })
                        }
                        if(this.type == "Number"){
                            this.HTTP.post(url,'0',{headers:{'Content-Type': 'text/plain'}}).then(response=>{
                                console.log(response.data)
                            })
                        }
                        
                        this.$emit("deviceInfor", this.name, this.label, this.type, this.tag)
                    }
                    else if(this.check == false && this.update == true){
                        this.HTTP.put(url,item).then(response=>{
                            console.log(response.data)
                            alert("Update success")
                        })
                        if(this.type == "Switch"){
                            this.HTTP.post(url,'OFF',{headers:{'Content-Type': 'text/plain'}}).then(response=>{
                                console.log(response.data)
                            })
                        }
                        if(this.type == "Number"){
                            this.HTTP.post(url,'0',{headers:{'Content-Type': 'text/plain'}}).then(response=>{
                                console.log(response.data)
                            })
                        }
                        this.$emit("deviceInfor", this.name, this.label, this.type, this.tag)
                    }
                })
            } 
            else {
                alert("Please fill required fields or check your input!!!")
            }
            
                
        },
        deleteDevice: function() {
            if(this.typeDevice.search("server") == -1){
                let url = 'items/'+this.name
                this.HTTP.delete(url).then(response=>{
                console.log(response.data)
            })
            }
            
            this.$emit('deleteDevice')
        }
    },

}
</script>

<style scoped>
.mini-menu-container {
    width: 300px;
    height: fit-content;
    z-index: 0;
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