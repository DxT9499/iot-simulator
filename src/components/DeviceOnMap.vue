<template>
	<div ref="draggableContainer" id="draggable-device" :style="style">
		<div
			id="draggable-device-header"
			@mousedown="dragMouseDown"
			v-on:dblclick= "isShowMM = !isShowMM"
		>
			<img class="device-img" :src="require(`../assets/iot-devices/${pic_url}`)" />
			<span class="name">{{ name }}</span>
			<span class="tooltiptext">Double click to open or close menu</span>
		</div>
		<MiniMenu
			v-if="isShowMM"
			v-bind:disabledEdit.sync="disabledEdit"
			v-bind:update.sync="update"
			v-bind:typeDevice.sync="pic_url"
			v-bind:name.sync="name"
			v-bind:label.sync="label"
			v-bind:type.sync="type"
			v-bind:tag.sync="tag"
			@deviceInfor="handleEventSubmit"
			@deleteDevice="handleEventDelete"
		></MiniMenu>
		<button class="button-toggle" :class= "{toggled: isToggled}" v-if="isToggleShow" @click= "changeState">{{isToggled ? 'ON' : 'OFF'}}</button>
		<input class="number-state" type="text" v-if="isNumStateShow" v-model= newState @change= "changeNumState">
		
	</div>
</template>
<script>
// import {config} from './http-common'
import axios from 'axios'
import MiniMenu from './MiniMenu.vue'

export default {
	name: "DraggableDiv",
	props: {
		pic_url: String,
		status: Boolean,
		positionX: String,
		positionY: String,
		
	},
	data() {
		return {
			isShowMM: false,
			disabledEdit: false,
			update: false,
			isToggleShow: false,
			isNumStateShow: false,
			isToggled: false,
			state: 0,
			newState:0,
			name: "",
			label: "",
			type: "",
			tag: "",
			positions: {
				clientX: undefined,
				clientY: undefined,
				movementX: 0,
				movementY: 0,
			},
			HTTP: axios.create({
                baseURL: this.$store.getters.baseUrl + '/rest',
                headers: {
                    Authorization: this.$store.getters.apiToken,
                    ContentType: "application/json",
                    AccessControlAllowOrigin:"*"
                }
            })
		};
	},
	components: {
		MiniMenu,
	},
	computed: {
		style() {
			return {
				left: this.positionX,
				top: this.positionY,
			};
		},
	},
	methods: {
		dragMouseDown: function(event) {
			event.preventDefault();
			// get the mouse cursor position at startup:
			this.positions.clientX = event.clientX;
			this.positions.clientY = event.clientY;
			document.onmousemove = this.elementDrag;
			document.onmouseup = this.closeDragElement;
		},
		elementDrag: function(event) {
			event.preventDefault();
			this.positions.movementX = this.positions.clientX - event.clientX;
			this.positions.movementY = this.positions.clientY - event.clientY;
			this.positions.clientX = event.clientX;
			this.positions.clientY = event.clientY;
			// set the element's new position:
			this.$refs.draggableContainer.style.top =
				this.$refs.draggableContainer.offsetTop -
				this.positions.movementY +
				"px";
			this.$refs.draggableContainer.style.left =
				this.$refs.draggableContainer.offsetLeft -
				this.positions.movementX +
				"px";
		},
		closeDragElement() {
			document.onmouseup = null;
			document.onmousemove = null;
		},
		handleEventDelete: function() {
			this.$emit("remove");
		},
		handleEventSubmit: function(name, label, type, tag) {
			this.name = name
			this.label = label
			this.type = type
			this.tag = tag
			if(type == 'Switch') {
				this.isNumStateShow = false
				this.isToggleShow = true
			}
			else if(type =='Number'){
				this.isNumStateShow = true
				this.isToggleShow = false
			}
			this.isShowMM = false
			this.disabledEdit = true
			this.update = true
			this.fetchState()
		},
		changeState: function() {
			this.isToggled = !this.isToggled
			const url = `items/` + this.name
			let data = ''
			if(this.isToggled) data = 'ON'
			else data = 'OFF'
			
			this.HTTP.post(url,data,{headers:{'Content-Type': 'text/plain'}}).then(response=>{
				response.data
			})
		},
		changeNumState: function() {
			if(isNaN(this.newState)){
				alert("Numer Only !!!")
				this.newState = this.state
			}
			else {
				this.state = this.newState
				const url = `items/` + this.name
				this.HTTP.post(url,this.state,{headers:{'Content-Type': 'text/plain'}}).then(response=>{
					response.data
				})
			}
		},
		fetchState: function() {
			console.log("fetchDta start")
			var es = new EventSource(
				"http://localhost:8080/rest/events/states",
				{
					withCredentials: true,
					headers:{
						'Access-Control-Allow-Credentials': true,
					}
				}
			);
			
			var items = [this.name]
			es.addEventListener('ready',(event)=>{
				
				this.HTTP.post(`/events/states/${event.data}`, 
					items
				)
			})
			es.addEventListener(
				"error",
				(event) => {
					if (event.readyState == EventSource.CLOSED) {
						console.log("Event was closed");
						console.log(EventSource);
					}
				},
				false
			);
			es.addEventListener(
				"message",
				(event) => {
					if(this.type == "Switch"){
						if(event.data.search("ON") != -1) this.isToggled = true
						else if(event.data.search("OFF" != -1)) this.isToggled = false
					}
					else if(this.type == "Number"){
						console.log(event.data)
						let start = event.data.lastIndexOf(':') + 2
						let end = event.data.lastIndexOf('"') 
						let data = event.data.slice(start,end)
						if(data != "NULL"){
							this.newState = Number(data)
							this.state = this.newState
						}
					}
				},
				false
			);
		}
	},
};
</script>

<style>
#draggable-device {
	position: absolute;
	z-index: 9;
	width: 100px;
	height: 100px;
	
}
#draggable-device-header {
	margin-left: auto;
	margin-right: auto;
	width: 75px;
	height: 75px;
	background-color: rgb(96,194,119,0.75);
	border-radius: 50%;
	z-index: 10;
}
#draggable-device #draggable-device-header img {
	position: relative;
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
	margin-bottom: 10px;
	width: 50px;
	height: 50px;
	padding-top: 12px;
}
#draggable-device #draggable-device-header .name {
	margin-top: 2px;
	display: block;
	text-align: center;
	color: black;
}
.button-toggle {
	position: absolute;
	border: none;
	color: white;
	height: 25px;
	width: 50px;
	border-radius: 5px;
	margin-top: -75px;
	margin-left: 50px;
	background-color: #C32110;
}
.button-toggle.toggled {
	background-color: #3A992B;
}

.number-state {
	position: absolute;
	border: none;
	color: white;
	height: 25px;
	width: 25px;
	text-align: center;
	border-radius: 5px;
	margin-top: -75px;
	margin-left: 0px;
	background-color: #396EFE;
}
#draggable-device #draggable-device-header .tooltiptext {
	position:absolute;
    visibility: hidden;
    width: fit-content;
    height: fit-content;
    background-color: #40B882;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
	margin-top: -140px;
	margin-left: -10px;
}
#draggable-device #draggable-device-header:hover .tooltiptext {
    visibility: visible;
}
</style>
