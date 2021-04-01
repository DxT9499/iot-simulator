<template>
    <div>
        <div class="tab-menu">
            <button class="tablinks active" v-on:click="isShow = !isShow">Create</button>
            <button class="tablinks" >2</button>
            <button class="tablinks" >3</button>
            <button class="tablinks" >4</button>
        </div>
        <TabContent v-if = 'isShow'/>
    </div>
</template>

<script>
import TabContent from './TabContent.vue'

export default {
    data() {
        return {
            isShow: true
        }
    },
    components: {
        TabContent
    }
}
</script>

<style scoped>

.tab-menu {
    float: left;
    background-color: #108ee9;
    margin-left: 0%;
    width: 60px;
    height: 897px;
}

.tab-menu button {
    color: white;
    display: block;
    background-color: inherit;
    padding: 22px 16px;
    width: 100%;
    border: none;
    outline: none;
    text-align: center;
    cursor: pointer;
    font-size: 10px;
}

.tab-menu button:hover {
    background-color: #396EFE;
}

.tab-menu button.active {
    background-color: white;
    color: #108ee9;
    border-right: none;
}
</style>