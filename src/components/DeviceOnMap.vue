<template>
  <div ref="draggableContainer" id="draggable-device" :style="style">
    <div id="draggable-device-header" @mousedown="dragMouseDown" v-on:dblclick="isShow=!isShow">
      <img :src = "require(`../assets/iot-devices/${pic_url}`)">
      <span class="name">{{name}}</span>
    </div>
    <MiniMenu v-if= "isShow" @deleteDevice= "handleEvent"></MiniMenu>
  </div>
</template>
<script>
import MiniMenu from './MiniMenu.vue'
export default {
  name: 'DraggableDiv',
  props: {
    pic_url: String,
    name: String,
    status: Boolean,
    positionX: String,
    positionY: String
  },
  data() {
    return {
    isShow:false,
    positions: {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0
    }
    }
  },
  components:{
    MiniMenu
  },
  computed: {
    style () {
      return {
        'left' : this.positionX,
        'top' : this.positionY
      }
    }
  },
  methods: {
    dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    },
    handleEvent: function() {
      this.$emit('remove')
    }
  }
}
</script>

<style>
#draggable-device {
  position: absolute;
  z-index: 9;
  width: 100px;
  height: 100px;
}
#draggable-device-header {
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
}
#draggable-device #draggable-device-header .name {
  margin-top: 2px;
  display: block;
  text-align: center;
  color: black;
}
</style>