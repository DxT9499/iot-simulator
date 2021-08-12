<template>
	<div id="app">
		<PageHeader :class="{'blur-content': disabled}" :disabled= "disabled"/>
		<TabMenu :class="{'blur-content': disabled}" :disabled= "disabled"/>
		<UiContainer :class="{'blur-content': disabled}" :disabled= "disabled"/>
		<ConnectTab @enable= "disabled = false"/>
	</div>
</template>

<script>
import PageHeader from "./components/PageHeader.vue";
import TabMenu from "./components/TabMenu.vue";
import UiContainer from "./components/UiContainer.vue";
import ConnectTab from "./components/ConnectTab.vue"

export default {
	name: "App",
	components: {
		PageHeader,
		TabMenu,
		UiContainer,
		ConnectTab
	},
	data() {
		return {
			disabled: true
		}
	}
};
</script>

<style>
body {
	position: relative;
	margin: 0px;
}
#app {
	font-family: "Frutiger Next LT W1G", Calibri, Arial, Helvetica, sans-serif;
	min-height: 100%;
}
.blur-content{
	filter: blur(5px);
}
</style>
