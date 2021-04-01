<template>
    <div class="mini-menu">
        <button class="menu-item">Status</button>
        <button class="menu-item" @click="deleteDevice">Delete</button>
    </div>
</template>

<script>
export default {
    methods:{
        deleteDevice: function() {
            this.$emit('deleteDevice','delete')
        }
    }
}
</script>

<style scoped>
.mini-menu {
    position: absolute;
    height: 40px;
    width: 300px;
}
.mini-menu .menu-item {
    display: inline-block;
    background-color: #108ee9;
    height: 40px;
    width: 150px;
    border: none;
    outline: none;
    color: white;
    text-align: center;
}

.mini-menu .menu-item:hover {
    background-color: #396EFE;
}

</style>